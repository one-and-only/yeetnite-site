import { executeQuery } from "../../../../../../includes/db";

export default async function friends(req, res) {
    if (req.query.accountId) {
        let friendRequestsResponse = [];
        let friendRequests;
        // don't include pending if not requested
        if (req.query.includePending === "true") {
            friendRequests = await executeQuery("SELECT * FROM friendRequests WHERE accountId = ? OR ownerAccountId = ?", [req.query.accountId, req.query.accountId]);
        } else {
            friendRequests = await executeQuery("SELECT * FROM friendRequests WHERE accountId = ? OR ownerAccountId = ? AND status = 'ACCEPTED'", [req.query.accountId, req.query.accountId]);
        }
        for (let i = 0; i < friendRequests.length; i++) {
            friendRequestsResponse.push(
                {
                    "accountId": req.query.accountId === friendRequests[i].accountId ? friendRequests[i].ownerAccountId : friendRequests[i].accountId,
                    "status": friendRequests[i].status,
                    "direction": req.query.accountId === friendRequests[i].accountId ? "INBOUND" : "OUTBOUND",
                    "created": friendRequests[i].created,
                    "favorite": friendRequests[i].favorite === 1 ? true : false,
                }
            );
        }
        res.json(friendRequestsResponse);
    } else {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}