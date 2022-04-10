import { prisma } from '@lib/prisma';

export default async function setBattleRoyaleBanner(req, res) {
    if (!(req.query.profileId === "athena")) {
        res.status(400).json({
            success: false,
            reason: `Invalid profileId of \`${req.query.profileId}\``
        });
        return;
    }

    // save the banner update
    await prisma.$queryRaw`UPDATE locker SET banner_icon = ${req.body.homebaseBannerIconId} WHERE user_id IN (SELECT user_id FROM users WHERE username = ${req.query.accountId})`;
    await prisma.$queryRaw`UPDATE locker SET banner_color = ${req.body.homebaseBannerColorId} WHERE user_id IN (SELECT user_id FROM users WHERE username = ${req.query.accountId})`;

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