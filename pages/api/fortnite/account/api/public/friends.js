import { prisma } from '@lib/prisma';

async function findExistingFriendRequest(accountId1, accountId2) {
    return await prisma.friendRequests.findFirst({
        where: {
            OR: [
                {
                    accountId: accountId1,
                    ownerAccountId: accountId2
                },
                {
                    accountId: accountId2,
                    ownerAccountId: accountId1
                }
            ]
        }
    });
}

export default async function friends(req, res) {
    if (req.method === "POST") {
        // check if there are any pending friend requests
        const pendingFriendRequest = await findExistingFriendRequest(req.query.accountId1, req.query.accountId2);

        if (!pendingFriendRequest) {
            // send an outgoing friend request because one doesn't exist
            const created = new Date().toISOString();
            await prisma.friendRequests.create({
                data: {
                    ownerAccountId: req.query.accountId1,
                    accountId: req.query.accountId2,
                    created: created
                }
            });

            // notify receiving XMPP client there is a pending friend request
            await fetch(`https://xmpp.yeetnite.ml:1443/rest/stream/${req.query.accountId2}%40xmpp.yeetnite.ml?api-key=${process.env.TIGASE_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/xml",
                    "Authorization": process.env.TIGASE_HTTP_AUTHORIZATION
                },
                body: `
<message from="${req.query.accountId1}@xmpp.yeetnite.ml" xmlns="jabber:client">
    <body>
        ${JSON.stringify({
                    type: "FRIENDSHIP_REQUEST",
                    timestamp: created,
                    from: req.query.accountId1,
                    status: "PENDING"
                })}
    </body>
</message>
                `
            });

            res.status(204).send();
            return;
        } else if (pendingFriendRequest.ownerAccountId === req.query.accountId1) {
            // user can't accept his own friend request
            res.status(204).send();
            return;
        }

        // accept the friend request
        await prisma.friendRequests.update({
            data: {
                status: "ACCEPTED"
            },
            where: {
                friendRequest_id: pendingFriendRequest.friendRequest_id
            }
        });

        // update the roster in the XMPP server
        for (let i = 0; i < 2; i++)
            await fetch(`https://xmpp.yeetnite.ml:1443/rest/adhoc/sess-man@xmpp.yeetnite.ml?api-key=${process.env.TIGASE_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": process.env.TIGASE_HTTP_AUTHORIZATION
                },
                body: JSON.stringify({
                    command: {
                        node: "roster-fixer",
                        fields: [
                            {
                                var: "roster-owner-jid",
                                value: `${i == 0 ? req.query.accountId1 : req.query.accountId2}@xmpp.yeetnite.ml`
                            },
                            {
                                var: "roster-action",
                                value: "update"
                            },
                            {
                                var: "roster-buddy-list",
                                value: `${i == 0 ? req.query.accountId2 : req.query.accountId1}@xmpp.yeetnite.ml`
                            }
                        ]
                    }
                })
            });

        // notify friend request initiator that the request has been accepted
        await fetch(`https://xmpp.yeetnite.ml:1443/rest/stream/${req.query.accountId1}%40xmpp.yeetnite.ml?api-key=${process.env.TIGASE_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/xml",
                "Authorization": process.env.TIGASE_HTTP_AUTHORIZATION
            },
            body: `
<message from="${req.query.accountId2}@xmpp.yeetnite.ml" xmlns="jabber:client">
<body>
    ${JSON.stringify({
                type: "FRIENDSHIP_REQUEST",
                timestamp: new Date().toISOString(),
                from: req.query.accountId2,
                status: "ACCEPTED"
            })}
</body>
</message>
            `
        });

        res.status(204).send();
    } else if (req.method === "DELETE") {
        await prisma.friendRequests.delete({
            where: {
                friendRequest_id: (await findExistingFriendRequest(req.query.accountId1, req.query.accountId2)).friendRequest_id
            }
        });
        for (let i = 0; i < 2; i++)
            await fetch(`https://xmpp.yeetnite.ml:1443/rest/adhoc/sess-man@xmpp.yeetnite.ml?api-key=${process.env.TIGASE_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": process.env.TIGASE_HTTP_AUTHORIZATION
                },
                body: JSON.stringify({
                    command: {
                        node: "roster-fixer",
                        fields: [
                            {
                                var: "roster-owner-jid",
                                value: `${i == 0 ? req.query.accountId1 : req.query.accountId2}@xmpp.yeetnite.ml`
                            },
                            {
                                var: "roster-action",
                                value: "remove"
                            },
                            {
                                var: "roster-buddy-list",
                                value: `${i == 0 ? req.query.accountId2 : req.query.accountId1}@xmpp.yeetnite.ml`
                            }
                        ]
                    }
                })
            });
        res.status(204).send();
    }
}
