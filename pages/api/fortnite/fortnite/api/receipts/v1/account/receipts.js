export default function receipts(req, res) {
    if (req.query.accountId) {
        res.json([]);
    } else {
        res.json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}