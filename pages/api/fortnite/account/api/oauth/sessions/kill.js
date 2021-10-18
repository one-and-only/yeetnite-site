// TODO track logout here when killType is "logout"

export default function kill(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    res.status(204).send();
}