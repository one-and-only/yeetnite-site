const keychainResponse = require('./keychains/s6.json');

export default function keychain(req, res) {
    if (req.query.rvn) {
        switch (req.query.rvn) {
            case '1':
                res.json(keychainResponse);
                break;
            default:
                res.status(400).json({
                    success: false,
                    reason: `Ivalid \`rvn\` of \`${req.query.rvn}\``
                });
                break;
        }
    } else {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}