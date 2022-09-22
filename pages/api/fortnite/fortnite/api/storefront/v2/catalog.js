import storefrontCatalog from './catalog.json';

export default function catalog(req, res) {
    if (req.query.rvn) {
        res.json(storefrontCatalog);
    } else {
        res.json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}