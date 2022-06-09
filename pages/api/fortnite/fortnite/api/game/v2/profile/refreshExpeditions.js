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
        case 'campaign':
            switch (req.query.rvn) {
                case "-1":
                    let campaign = require('./profiles/expeditions_campaign.json');

                    campaign.profileChanges[0].profile.accountId = req.query.accountId;
                    campaign.profileChanges[0].profile.created = await getCreated(req.query.accountId);
                    campaign.profileChanges[0].profile.updated = serverTime;
                    campaign.serverTime = serverTime;

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