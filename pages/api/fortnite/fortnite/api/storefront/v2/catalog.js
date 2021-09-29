const catalogResponse = require('./catalogs/s6.json');

export default function catalog(req, res) {
    if (req.query.rvn) {
        switch (req.query.rvn) {
            case '1':
                res.json(catalogResponse);
                break;
            default:
                res.json({
                    success: false,
                    error: `Invalid \`rvn\` of \`${req.query.rvn}\``
                });
        }
    } else {
        res.json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}