export default function externalAuth(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    if (req.query.accountId) {
        res.json([]);
    }
}