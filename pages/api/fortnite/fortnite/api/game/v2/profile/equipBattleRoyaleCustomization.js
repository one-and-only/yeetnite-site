import { prisma } from "@lib/prisma";

export default async function equipBattleRoyaleCustomization(req, res) {
    if (!(req.query.profileId === "athena")) {
        res.status(400).json({
            success: false,
            reason: `Invalid profileId: ${req.query.profileId}`,
        });
        return;
    }

    let profileRevision = parseInt(req.query.rvn);
    let profileChanges;

    // "Dance" has an array of values for each of the emote slots
    if (req.body.slotName == "Dance") {
        profileChanges = JSON.parse((await prisma.$queryRaw`SELECT favorite_dance FROM locker INNER JOIN users ON users.user_id = locker.user_id WHERE users.username = ${req.query.accountId}`).favorite_dance);
        profileChanges[req.body.indexWithinSlot] = req.body.itemToSlot;
        profileChanges = JSON.stringify(profileChanges);
    } else {
        profileChanges = req.body.itemToSlot;
    }

    // save the locker changes
    await prisma.$queryRaw`UPDATE locker SET favorite_${req.body.slotName.toLowerCase()} = ${profileChanges} WHERE user_id IN (SELECT user_id FROM users WHERE username = ${req.query.accountId})`;

    res.json({
        "profileRevision": profileRevision + 1,
        "profileId": "athena",
        "profileChangesBaseRevision": profileRevision,
        "profileChanges": [
            {
                "changeType": "statModified",
                "name": `favorite_${req.body.slotName.toLowerCase()}`,
                "value": (req.body.slotName == "Dance") ? JSON.parse(profileChanges) : req.body.itemToSlot,
            }
        ],
        "profileCommandRevision": athena_profile.profileCommandRevision,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    });
}