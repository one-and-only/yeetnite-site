import { prisma } from '@lib/prisma';

async function getBlocklist(username) {
    return JSON.parse((await prisma.users.findFirst({
        select: {
            blockList: true
        },
        where: {
            username: username
        }
    })).blockList);
}

async function updateBlocklist(blockList, username) {
    await prisma.users.update({
        data: {
            blockList: JSON.stringify(blockList)
        },
        where: {
            username: username
        }
    });
}

export default async function blockList(req, res) {
    if (req.query.accountId) {
        // check if we are blocking a user or just getting the block list
        if (req.query.blocking) {
            if (req.method === "POST") {
                let blockList = await getBlocklist(req.query.accountId);
                blockList.push(req.query.blocking);
                await updateBlocklist(blockList, req.query.accountId);
                // unfriend the user if they're being blocked
                await prisma.friendRequests.deleteMany({
                    where: {
                        OR: [
                            {
                                AND: [{ ownerAccountId: req.query.accountId }, { accountId: req.query.blocking }]
                            },
                            {
                                AND: [{ ownerAccountId: req.query.blocking }, { accountId: req.query.accountId }]
                            }
                        ]
                    }
                });

                res.status(204).send();
            } else if (req.method === "DELETE") {
                let blockList = await getBlocklist(req.query.accountId);
                blockList.splice(blockList.indexOf(req.query.blocking), 1);
                await updateBlocklist(blockList, req.query.accountId);

                res.status(204).send();
            } else {
                res.status(405).json({
                    success: false,
                    reason: `Cannot ${req.method} on blocklist endpoint`,
                });
            }
        } else {
            res.json({
                "blockedUsers": await getBlocklist(req.query.accountId)
            });
        }
    } else {
        res.status(400).json({
            status: "error",
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}