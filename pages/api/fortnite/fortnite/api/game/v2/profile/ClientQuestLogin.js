export default function clientQuestLogin(req, res) {
    if (req.query.accountId && req.query.profileId && req.query.rvn) {
        switch (req.query.profileId) {
            case 'athena':
                res.json(
                    {
                        "accountId": req.query.accountId,
                        "displayName": req.query.accountId
                    }
                );
                break;
            default:
                res.json({
                    success: false,
                    reason: `invalid \`profileId\` of \`${req.query.profileId}\``
                });
                break;
        }
    } else {
        res.json({
            status: "error",
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}