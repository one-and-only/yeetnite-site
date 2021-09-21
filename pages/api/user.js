import { executeQuery } from "../../includes/db"; // would have loved if relative paths worked :(

export default async function processUserRequest(req, res) {
    if (req.method === "POST") {
        // sanity check
        if (!req.body.username || !req.body.email || !req.body.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        } else {
            const duplicateUsers = executeQuery("SELECT * FROM users WHERE username = ? OR email = ?", [req.body.username, req.body.email]);
            duplicateUsers.then(duplicates => {
                if (duplicates.length > 0) {
                    res.json({ success: false, reason: "Username or Email already exists" });
                } else {
                    executeQuery("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [req.body.username, req.body.email, req.body.password]).then(() => {
                        executeQuery("SELECT * FROM users WHERE username = ?", [req.body.username]).then(user => {
                            res.json({ success: true, user: user[0] });
                        }).catch(err => {
                            res.json({ success: false, reason: err });
                        });
                    });
                }
            });
        }
    } else if (req.method === "GET") {
        // sanity check
        if (!req.query.username || !req.query.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        } else {
            executeQuery("SELECT * FROM `users` WHERE username = ?", [req.query.username]).then(loginResponse => {
                const loginJson = loginResponse;
                if (loginJson[0].password === req.query.password) {
                    res.json({ success: true, user: loginJson[0] });
                } else {
                    res.json({ success: false, reason: "Invalid username or password" });
                }
            }).catch(err => {
                res.json({ success: false, reason: err });
            });
        }
    } else {
        res.json({ success: false, reason: "Invalid HTTP Method" });
    }
}