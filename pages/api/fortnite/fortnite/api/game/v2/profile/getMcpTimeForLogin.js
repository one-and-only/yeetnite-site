export default function getMcpTimeForLogin(req, res) {
    const serverTime = new Date().toISOString();
    switch (req.query.profileId) {
        case 'profile0':
            res.json({
                "profileRevision": req.query.rvn,
                "profileId": "profile0",
                "profileChangesBaseRevision": req.query.rvn,
                "profileChanges": [],
                "profileCommandRevision": 281,
                "serverTime": serverTime,
                "responseVersion": 1
            });
            break;
        default:
            res.status(400).json({
                success: false,
                reason: `Invalid \`profileId\` of \`${req.query.profileId}\``,
            });
            break;
    }
}