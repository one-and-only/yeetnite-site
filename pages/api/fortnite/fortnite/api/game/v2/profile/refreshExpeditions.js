import { prisma } from '@lib/prisma';

async function getCreated(username) {
    return (await prisma.users.findFirst({
        select: {
            created: true
        },
        where: {
            username: username
        }
    }))?.created;
}

export default async function refreshExpeditions(req, res) {
    if (req.method !== "POST") {
        res.status(400).json({
            success: false,
            reason: `Invalid request method of \`${req.method}\``
        });
        return;
    }

    const serverTime = new Date().toISOString();
    switch (req.query.profileId) {
        case 'profile0':
            let profile0 = await import('./profiles/expeditions_profile0.json');
            profile0.default.serverTime = serverTime;
            profile0.default.profileRevision = parseInt(req.query.rvn);
            profile0.default.profileChangesBaseRevision = parseInt(req.query.rvn);
            res.json(profile0);
            break;
        case 'campaign':
            switch (req.query.rvn) {
                case "-1":
                    let campaign = await import('./profiles/expeditions_campaign.json');

                    campaign.profileChanges[0].profile.accountId = req.query.accountId;
                    campaign.profileChanges[0].profile.created = await getCreated(req.query.accountId);
                    campaign.profileChanges[0].profile.updated = serverTime;
                    campaign.default.serverTime = serverTime;

                    res.json(campaign);
                    break;
                default:
                    res.json({
                        profileRevision: parseInt(req.query.rvn),
                        profileId: "campaign",
                        profileChangesBaseRevision: parseInt(req.query.rvn),
                        profileChanges: [],
                        profileCommandRevision: parseInt(req.query.rvn) - 10,
                        serverTime: new Date().toISOString(),
                        responseVersion: 1
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
}