// ! Remove when in production
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Fortnite <account/api/oauth/token | PUT,POST>
 * @param  {any} req
 * @param  {any} res
 */
export default async function token(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');

    res.json(await (await fetch("https://localhost:8443/token_auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body)
    })).json());
}
