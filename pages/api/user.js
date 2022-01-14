// ! Remove when in production
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function processUserRequest(req, res) {
    if (req.method === "POST") {
        // sanity check
        if (!req.body.username || !req.body.email || !req.body.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        } else {
            // do register request
            res.json(await ((await fetch(`https://localhost:8443/register?username=${encodeURIComponent(req.body.username)}&email=${encodeURIComponent(req.body.email)}&password=${encodeURIComponent(req.body.password)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })).json()));
        }
    } else if (req.method === "GET") {
        // sanity check
        if (!req.query.username || !req.query.password) {
            res.json({ success: false, reason: "We have received invalid data and are unable to receive your request" });
            return;
        } else {
            res.json(await ((await fetch(`https://localhost:8443/login?username=${encodeURIComponent(req.query.username)}&password=${encodeURIComponent(req.query.password)}`)).json()));
        }
    } else {
        res.json({ success: false, reason: "Invalid HTTP Method" });
    }
}