import { executeQuery } from "../../includes/db";

export default async function processUserRequest(req, res) {
    if (req.method === "POST") {
        // sanity check
        if (!req.body.username || !req.body.email || !req.body.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        } else {
            res.json({ success: true, username: req.body.username, email: req.body.email, password: req.body.password });
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
                        res.json({ success: false, reason: "Invalid password" });
                    }
                });
            }
            executeQuery("SELECT * FROM `users` WHERE username = ?", [req.query.username], processDbResponse);
        }
    } else {
        res.json({ success: false, reason: "Invalid HTTP Method" });
    }
}