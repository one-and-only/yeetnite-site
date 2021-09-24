export default function clientQuestLogin(req, res) {
    if (req.query.accountId && req.query.profileId && req.query.rvn) {
        switch (req.query.profileId) {
            case 'athena':
                switch (req.query.rvn) {
                    case '1':
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
                            reason: `invalid \`rvn\` of \`${req.query.rvn}\``
                        });
                        break;
                }
                break;
            default:
                res.json({
                    success: false,
                    reason: "invalid profileId provided"
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