export const config = {
    runtime: 'experimental-edge',
}

export default function offers(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.json({});
}