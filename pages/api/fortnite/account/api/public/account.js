// ! Remove when in production
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default async function account(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');
    res.json(await (await (await fetch(`https://localhost:8443/get_account_info?payload=${encodeURIComponent(JSON.stringify(req.query))}`)).json()));
}