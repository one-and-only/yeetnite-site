export default function tryPlayOnPlatform(req, res) {
    if (req.query.platform === 'PC') {
        res.send('true');
    } else {
        // no official support for clients on other platforms except PC (Win7, 10, etc)
        res.send('false');
    }
}