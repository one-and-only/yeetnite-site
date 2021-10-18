const statusResponse = require('./status.json');

export default function status(req, res) {
    res.json(statusResponse);
}