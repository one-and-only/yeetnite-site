export default function account(req, res) {
    res.json({
        "accountId": req.query.accountId,
        "optOutOfPublicLeaderboards": false,
    });
}