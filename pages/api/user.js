import { executeQuery } from "../../includes/db"; // would have loved if relative paths worked :(
import { randomBytes } from "crypto";

export default function processUserRequest(req, res) {
    if (req.method === "POST") {
        // sanity check
        if (!req.body.username || !req.body.email || !req.body.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        } else {
            const duplicateUsers = executeQuery("SELECT * FROM users WHERE username = ? OR email = ?", [req.body.username, req.body.email]);
            duplicateUsers.then(async duplicates => {
                if (duplicates.length > 0) {
                    res.json({ success: false, reason: "Username or Email already exists" });
                } else {
                    await executeQuery("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [req.body.username, req.body.email, req.body.password]);
                    executeQuery("SELECT username, email, user_id, accessToken FROM users WHERE username = ?", [req.body.username]).then(async user => {
                        await executeQuery('INSERT INTO locker (user_id) VALUES (?)', [user[0].user_id]);
                        let accessToken = randomBytes(8).toString('hex');
                        if (user[0].accessToken == null) {
                            const accessTokens = await executeQuery('SELECT accessToken from users');
                            // make sure we have a unique access token
                            while (accessTokens.filter(x => x == accessToken).length > 0)
                                accessToken = randomBytes(8).toString('hex');
                            await executeQuery('UPDATE users SET accessToken = ? WHERE username = ?', [accessToken, user[0].username]);
                        }
                        accessToken = user[0].accessToken != null ? user[0].accessToken : accessToken;
                        // register the user into our XMPP server
                        const xmppRegistration = await (await fetch("https://xmpp.yeetnite.ml/api/register", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                "user": req.body.username,
                                "host": "xmpp.yeetnite.ml",
                                "password": accessToken
                            }),
                        })).text();
                        if (xmppRegistration.includes('successfully registered')) {
                            res.json({ success: true, user: { username: user[0].username } });
                        } else {
                            res.json({
                                success: false,
                                reason: xmppRegistration
                            });
                        }
                    }).catch(err => {
                        res.json({ success: false, reason: err });
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
            executeQuery("SELECT username, email, password FROM `users` WHERE username = ?", [req.query.username]).then(loginResponse => {
                const loginJson = loginResponse;
                if (loginJson[0].password === req.query.password) {
                    res.json({ success: true, user: { username: loginJson[0].username } });
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