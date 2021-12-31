// Next.js
import Head from 'next/head';
import Image from 'next/image';
// Bootstrap
import { Nav, Navbar, Button, Modal, Form, Dropdown } from 'react-bootstrap'
// React.js
import { useEffect, useState } from 'react';
// Static image imports get cached efficiently
import brandImg from '../public/favicons/android-chrome-192x192.png';
//SweetAlert2
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const ReactSwal = withReactContent(Swal);

/**
 * Default component for the Header
 */
export default function Header() {
    const [usernameState, setUsername] = useState(false);
    const [themeColorState, setThemeColor] = useState("#2c2c2c");
    // initially don't show the modals
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    // localStorage is only usable in CSR
    useEffect(() => {
        document.documentElement.lang = 'en';
        const yeetnite_user = localStorage.getItem("yeetnite_user");
        (yeetnite_user != null) && setUsername(JSON.parse(yeetnite_user).username);

        // set proper color theme for meta tag
        // changes to the color theme need a page reload to take effect
        window.matchMedia("(prefers-color-scheme: light)").matches && setThemeColor("#ffffff");
    }, []);

    /**
     * Show a SweetAlert with the Yeetnite template
     * @param  {string} type - The type of the alert
     * @param  {JSX.Element} title - Title of the alert
     * @param  {string} html - HTML (stringified) that shows as the body of the alert
     */
    async function sweetAlert(type, title, html) {
        let icon;
        switch (type) {
            case "success":
                icon = "success";
                break;
            case "error":
                icon = "error";
                break;
            default:
                icon = "question";
                break;
        }
        ReactSwal.fire({
            title: title,
            icon: icon,
            html: html,
            footer: '©2021 The Yeetnite Team',
            customClass: {
                closeButton: 'btn btn-info',
                confirmButton: 'btn btn-primary',
                denyButton: 'btn btn-danger',
                cancelButton: 'btn btn-info',
            },
            buttonsStyling: false,
            timer: (type === "success") ? 5000 : undefined,
        });
    }

    /**
     * Handle Login request
     */
    async function processLogin() {
        const username = document.getElementById("formBasicUsernameLogin").value;
        const password = document.getElementById("formBasicPasswordLogin").value;
        await fetch(`/api/user?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`).then(response => response.json().then(responseJson => {
            if (responseJson.success) {
                localStorage.setItem("yeetnite_user", JSON.stringify(responseJson.user));
                setUsername(responseJson.user.username);
                sweetAlert('success', <p>Login Successful</p>, `<p>You are now logged in as <b>${responseJson.user.username}</b></p>`);
            } else {
                switch (responseJson.reason) {
                    case "Invalid username or password":
                        sweetAlert('error', <p>Login Failed</p>, `<p>Invalid Username or Password</p>`);
                        break;
                    default:
                        sweetAlert('error', <p>Login Failed</p>, `<p>An Unknown Error Occured. Reason Provided By Our Servers:\n\n${JSON.stringify(responseJson.reason)}</p>`);
                        break;
                }
            }
        }));
    }

    /**
     * Process Register request
     */
    async function processRegister() {
        const username = document.getElementById("formBasicUsernameRegister").value;
        const email = document.getElementById("formBasicEmailRegister").value;
        const password = document.getElementById("formBasicPasswordRegister").value;
        await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            })
        }).then(response => response.json().then(registerData => {
            if (registerData.success) {
                localStorage.setItem('yeetnite_user', JSON.stringify(registerData.user));
                setUsername(registerData.user.username);
                sweetAlert('success', <p>Registration Succeeded</p>, `<p>You have successfully registered. You are now automatically signed in as <b>${registerData.user.username}</b></p>`);
            } else {
                sweetAlert('error', <p>Registration Failed</p>, `<p>An Error Occured While Registering: <b>${registerData.reason}</b></p>`);
            }
        }));
    }

    /**
     * Logout the user
     */
    function logout() {
        localStorage.removeItem('yeetnite_user');
        setUsername(false);
    }

    /**
     * Generate the right side of the navbar
     */
    function RightNavbarContent() {
        if (usernameState) {
            return (
                <Nav>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            {usernameState}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            );
        } else {
            return (
                <Nav>
                    <Nav.Item>
                        <Nav.Link bsPrefix="customnav-link" onClick={() => setShowLoginModal(true)}>Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link bsPrefix="customnav-link" onClick={() => setShowRegisterModal(true)}>Register</Nav.Link>
                    </Nav.Item>
                </Nav>
            );
        }
    }

    /**
     * Generate a modal with the given type
     * @param {string} type - Type of the modal (___"register"___ | ___"login"___)
     */
    function GenerateModal({ type }) {
        let body; // modal body
        let footer; // modal footer
        let xButton; // "X" button on the top right of the modal
        if (type == "register") {
            body = (
                <Form onSubmit={() => processRegister()} method="POST">
                    <Form.Group className="mb-3" controlId="formBasicUsernameRegister">
                        <Form.Label>Username</Form.Label>
                        <Form.Control maxLength={18} type="text" name="username" placeholder="Username" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmailRegister">
                        <Form.Label>Email</Form.Label>
                        <Form.Control maxLength={255} type="email" name="email" placeholder="Email" required />
                        <Form.Text bsPrefix="muted-text">We&apos;ll never share your email with anyone else.</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordRegister">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" required />
                    </Form.Group>
                </Form>
            );
            footer = (
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowRegisterModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => { processRegister(); setShowRegisterModal(false) }}>Register</Button>
                </Modal.Footer>
            );
            xButton = (
                <button type="button" className="btn-close modal-xbutton" aria-label="Close" onClick={() => setShowRegisterModal(false)}></button>
            );
        } else if (type == "login") {
            body = (
                <Form onSubmit={() => processLogin()} method="GET">
                    <Form.Group className="mb-3" controlId="formBasicUsernameLogin">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" placeholder="Username" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPasswordLogin">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" required />
                    </Form.Group>
                </Form>
            );
            footer = (
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowLoginModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={() => { processLogin(); setShowLoginModal(false) }}>Login</Button>
                </Modal.Footer>
            );
            xButton = (
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowLoginModal(false)}></button>
            );
        }

        return (
            <Modal contentClassName="modal-theme" show={(type == "register") ? showRegisterModal : showLoginModal} backdrop="static" centered>
                <Modal.Header>
                    <Modal.Title>{(type == "register") ? "Register" : "Login"}</Modal.Title>
                    {xButton}
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer>
                    {footer}
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                <link rel="manifest" href="/favicons/site.webmanifest" />
                <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#603cba" />
                <link rel="shortcut icon" href="/favicons/favicon.ico" />
                <meta name="apple-mobile-web-app-title" content="Yeetnite" />
                <meta name="application-name" content="Yeetnite" />
                <meta name="msapplication-TileColor" content="#603cba" />
                <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
                <meta name="theme-color" content={themeColorState} />
                <title>Yeetnite</title>
                <meta name="description" content="Yeetnite is a Fortnite Private Server that implements all the capabilities of Fortnite and even allows for matchmaking, friending, partying up, etc." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Navbar collapseOnSelect expand="md" className="signature-navbar">
                <Navbar.Brand href="/"><Image height={40} width={40} src={brandImg} alt="Yeetnite Brand Icon" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Nav.Link bsPrefix="customnav-link" href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link bsPrefix="customnav-link" href="/features">Features</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link bsPrefix="customnav-link" href="/download">Download</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link bsPrefix="customnav-link" href="/setup">Setup</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <RightNavbarContent />
                </Navbar.Collapse>
            </Navbar>
            <GenerateModal type="register" />
            <GenerateModal type="login" />
        </div>
    );
}
