import { executeQuery } from '../../../../../../../../includes/db';

export default async function setBattleRoyaleBanner(req, res) {
    if (req.query.profileId === "athena") {
        await executeQuery("UPDATE locker SET banner_icon = ? WHERE user_id IN (SELECT user_id FROM users WHERE username = ?)", [req.body.homebaseBannerIconId, req.query.accountId]);
        await executeQuery("UPDATE locker SET banner_color = ? WHERE user_id IN (SELECT user_id FROM users WHERE username = ?)", [req.body.homebaseBannerColorId, req.query.accountId]);
        res.json({
            "profileRevision": parseInt(req.query.rvn) + 1,
            "profileId": "athena",
            "profileChangesBaseRevision": parseInt(req.query.rvn),
            "profileChanges": [
                {
                    "changeType": "statModified",
                    "name": "banner_icon",
                    "value": req.body.homebaseBannerIconId
                },
                {
                    "changeType": "statModified",
                    "name": "banner_color",
                    "value": req.body.homebaseBannerColorId
                }
            ],
            "profileCommandRevision": 2638,
            "serverTime": "2021-11-02T22:47:41.725Z",
            "responseVersion": 1
        });
    }
}