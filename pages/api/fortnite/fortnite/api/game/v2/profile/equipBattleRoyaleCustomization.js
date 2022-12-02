import { prisma } from "@lib/prisma";
import athena from './profiles/athena.json';

const indexed_types = ["itemwrap", "dance"]

export default async function equipBattleRoyaleCustomization(req, res) {
    if (!(req.query.profileId === "athena")) {
        res.status(400).json({
            success: false,
            reason: `Invalid profileId: ${req.query.profileId}`,
        });
        return;
    }

    const profileRevision = parseInt(req.query.rvn);
    const lockerItemName = req.body.slotName.toLowerCase();
    const isIndexedItem = indexed_types.includes(lockerItemName); // Some cosmetics are "slot" based (emotes, weapon wraps, etc.)
    let profileChanges;

    if (isIndexedItem) {
        const user_id = (await prisma.users.findFirst({
            select: {
                user_id: true
            },
            where: {
                username: req.query.accountId
            }
        })).user_id;

        let lockerItemParams = {
            select: {},
            where: {
                user_id: user_id
            }
        }
        lockerItemParams.select[`favorite_${lockerItemName}`] = true;

        const currentLockerItem = (await prisma.locker.findFirst(lockerItemParams))[`favorite_${lockerItemName}`];
        profileChanges = JSON.parse(currentLockerItem);
        profileChanges[parseInt(req.body.indexWithinSlot)] = req.body.itemToSlot;
        profileChanges = JSON.stringify(profileChanges);
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
                "value": (isIndexedItem) ? JSON.parse(profileChanges) : req.body.itemToSlot,
            }
        ],
        "profileCommandRevision": athena.profileCommandRevision,
        "serverTime": new Date().toISOString(),
        "responseVersion": 1
    });
}