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

async function setUpdated(username, updated) {
    await prisma.users.update({
        where: {
            username: username
        },
        data: {
            lastLogin: updated
        }
    });
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

                    // we don't want to update if the user doesn't exist
                    if (campaign.profileChanges[0].profile.created)
                        await setUpdated(req.query.accountId, serverTime);

                    res.json(campaign);
                    break;
                default:
                    res.json({
                        profileRevision: req.query.rvn,
                        profileId: "campaign",
                        profileChangesBaseRevision: req.query.rvn,
                        profileChanges: [],
                        profileCommandRevision: 617,
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