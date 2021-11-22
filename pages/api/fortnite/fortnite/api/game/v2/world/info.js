const worldInfoJson = require('./worlds/1.8.2.json');

export default function worldInfo(req, res) {
    res.json(worldInfoJson);
}