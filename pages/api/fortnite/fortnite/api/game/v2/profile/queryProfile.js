export default function queryProfile(req, res) {
    if (req.query.accountId && req.query.profileId && req.query.rvn) {
        const serverTime = new Date().toISOString();
        switch (req.query.profileId) {
            case 'athena':
                switch (req.query.rvn) {
                    case '-1':
                        // TODO make created and updated time dynamic (Needs some database work?)
                        res.json(
                            {
                                "profileRevision": 1,
                                "profileId": req.query.profileId,
                                "profileChangesBaseRevision": 1,
                                "profileChanges": [
                                    {
                                        "changeType": "fullProfileUpdate",
                                        "profile": {
                                            "created": serverTime,
                                            "updated": serverTime,
                                            "rvn": 1,
                                            "wipeNumber": 1,
                                            "accountId": req.query.accountId,
                                            "profileId": req.query.profileId,
                                            "version": "no_version",
                                            "items": {},
                                            "stats": {
                                                "attributes": {
                                                    "banner_color": "defaultcolor1",
                                                    "homebase_name": req.query.accountId,
                                                    "banner_icon": "brseason01"
                                                }
                                            },
                                            "commandRevision": 0
                                        }
                                    }
                                ],
                                "profileCommandRevision": 0,
                                "serverTime": serverTime,
                                "responseVersion": 1
                            }
                        );
                        break;
                    default:
                        res.status(400).json({
                            success: false,
                            reason: `Invalid \`rvn\` of \`${req.query.rvn}\``
                        });
                        break;
                }
                break;
            default:
                res.status(400).json({
                    success: false,
                    reason: `Invalid \`profileId\` of \`${req.query.profileId}\``
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