// TODO: Add <html lang="..."> attribute

import Head from 'next/head';
import Image from 'next/image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
// static image imports get cached efficiently
import brandImg from '../public/favicons/android-chrome-192x192.png';

export default function Header() {
    // initially don't show the modals
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [userState, setUserState] = useState({
        theme: "dark",
        themeColor: "#2c2c2c",
        username: null,
    });

    // localStorage is only usable in CSR
    useEffect(() => {
        const yeetnite_user = localStorage.getItem("yeetnite_user");
        (yeetnite_user != null) ? setUserState(JSON.parse(yeetnite_user)) : null;
    }, []);

    /**
     * Handle Login request
     */
    function processLogin() {
        const username = document.getElementById("formBasicUsernameLogin").value;
        const password = document.getElementById("formBasicPasswordLogin").value;
    }

    /**
     * Process Register request
     */
    function processRegister() {
        const username = document.getElementById("formBasicUsernameRegister").value;
        const email = document.getElementById("formBasicEmailRegister").value;
        const password = document.getElementById("formBasicPasswordRegister").value;
    }

    /**
     * Generate the right side of the navbar
     */
    function RightNavbarContent() {
        if (userState.username != null) {
            // TODO: Handle being logged in
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
                        <Form.Control type="text" name="username" placeholder="Username" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmailRegister">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Email" required />
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
                <meta name="theme-color" content={userState.themeColor} />
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
