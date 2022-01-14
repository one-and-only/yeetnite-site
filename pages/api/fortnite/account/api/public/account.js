export default async function account(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');
    res.json(await (await (await fetch(`https://${process.env.DBAPI_HOST}/get_account_info?payload=${encodeURIComponent(JSON.stringify(req.query))}`)).json()));
}