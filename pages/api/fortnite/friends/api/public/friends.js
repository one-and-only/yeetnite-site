import { prisma } from '@lib/prisma';

export default async function friends(req, res) {
    if (!req.query.accountId) {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
        return;
    }

    const friendRequestsSelectPayload = {
        where: {
            OR: [
                { accountId: req.query.accountId },
                { ownerAccountId: req.query.accountId }
            ],
        }
    };

    if (!(req.query.includePending === "true"))
        friendRequestsSelectPayload.where.AND = [
            { status: "ACCEPTED" }
        ];

    res.json(
        (await prisma.friendRequests.findMany(friendRequestsSelectPayload)).map(friendRequest => {
            return {
                "accountId": req.query.accountId === friendRequest.accountId ? friendRequest.ownerAccountId : friendRequest.accountId,
                "status": friendRequest.status,
                "direction": req.query.accountId === friendRequest.accountId ? "INBOUND" : "OUTBOUND",
                "created": friendRequest.created,
                "favorite": friendRequest.favorite === 1 ? true : false,
            }
        })
    );
}