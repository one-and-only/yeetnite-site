export const config = {
    runtime: 'experimental-edge',
}

export default function recentPlayers(req, res) {
    if (req.query.accountId) {
        res.json([]);
    } else {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}