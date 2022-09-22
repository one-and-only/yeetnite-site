import { prisma } from "@lib/prisma";
import athena from './profiles/athena.json';

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
        const user_id = (await prisma.users.findFirst({
            select: {
                user_id: first
            },
            where: {
                username: req.query.accountId
            }
        })).user_id;
        profileChanges = JSON.parse((await prisma.locker.findFirst({
            select: {
                favorite_dance: true
            },
            where: {
                user_id: user_id
            }
        })).favorite_dance);
        profileChanges[req.body.indexWithinSlot] = req.body.itemToSlot;
        profileChanges = JSON.stringify(profileChanges);
    } else {
        profileChanges = req.body.itemToSlot;
    }

    // save the locker changes
    const user_id = (await prisma.users.findFirst({
        select: {
            user_id: true
        },
        where: {
            username: req.query.accountId
        }
    })).user_id;
    let updateParams = {
        where: {
            user_id: user_id,
        },
        data: {},
    };
    updateParams.data[`favorite_${req.body.slotName.toLowerCase()}`] = profileChanges;
    await prisma.locker.update(updateParams);

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
        "profileCommandRevision": athena.profileCommandRevision,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    });
}