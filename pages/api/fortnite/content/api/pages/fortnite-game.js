const response = require('./contents/s6.json');

export default function fortniteContent(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.json(response);
}