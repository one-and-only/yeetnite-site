const systemJson = require('./systems/s6.json');

export default function system(req, res) {
    res.json(systemJson);
}