import { executeQuery } from "@db";

export default function processUserRequest(req, res) {
    if (req.method === "POST") {
        // sanity check
        if (!req.body.username || !req.body.email || !req.body.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        } else {
            // store whether to continue with the request or not
            let continueRequest = true;
            /**
             * @param  {Map<string, any>} dataMap
             */
            function registerResponseHandler(dataMap) {
                let err = dataMap.get('error');
                if (err) {
                    res.json({ success: false, reason: err });
                    continueRequest = false;
                } else {
                    res.json({ success: true, user: { username: req.body.username, email: req.body.email } });
                    continueRequest = false;
                }
            }
            /**
            * Process the data provided by the SQL query for login
            * @param {Map<string, any>} dataMap - Data provided by the SQL query
            */
            function registrationCheck(dataMap) {
                let rows = dataMap.get('fields');
                let err = dataMap.get('error');
                if (err) {
                    res.json({ success: false, reason: err });
                    continueRequest = false;
                }
                if (rows.length > 0) { res.json({ success: false, reason: "Username or Email already exists" }); continueRequest = false };
                continueRequest && executeQuery("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [req.body.username, req.body.email, req.body.password], registerResponseHandler);
            }
            executeQuery("SELECT * FROM users WHERE username = ? OR email = ?", [req.body.username, req.body.email], registrationCheck);
        }
    } else if (req.method === "GET") {
        // sanity check
        if (!req.query.username || !req.query.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        } else {
            /**
             * Process the data provided by the SQL query for login
             * @param  {Map<string, any>} dataMap - Data provided by the SQL query
             */
            function processDbResponse(dataMap) {
                let rows = dataMap.get('fields');
                let err = dataMap.get('error');
                if (err) {
                    res.json({ success: false, reason: err });
                    return;
                }
                rows.forEach(row => {
                    if (row.password === req.query.password) {
                        res.json({ success: true, user: row });
                    } else {
                        res.json({ success: false, reason: "Invalid username or password" });
                    }
                });
            }
            executeQuery("SELECT * FROM `users` WHERE username = ?", [req.query.username], processDbResponse);
        }
    } else {
        res.json({ success: false, reason: "Invalid HTTP Method" });
    }
}