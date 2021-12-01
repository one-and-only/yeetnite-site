import { executeQuery } from "../../../../../../includes/db";

export default async function friends(req, res) {
    if (req.method === "POST") {
        // if the user is accepting, then they should be the recipient and not the sender of the request
        const getPendingFriendRequests = await executeQuery("SELECT * FROM friendRequests WHERE accountId = ?", [req.query.accountId1]);
        if (getPendingFriendRequests.length > 0) {
            // since there already is a pending request, it means that we are accepting the request and becoming friends
            await executeQuery("UPDATE friendRequests SET status = 'ACCEPTED' WHERE accountId = ? and ownerAccountId = ?", [req.query.accountId1, req.query.accountId2]);
        } else {
            // since there is no pending request, it means that we are sending the request
            const serverTime = new Date().toISOString();
            await executeQuery("INSERT INTO friendRequests (ownerAccountId, accountId, created) VALUES (?, ?, ?)", [req.query.accountId1, req.query.accountId2, serverTime]);
        }
        res.status(204).send();
    } else if (req.method === "DELETE") {
        const pendingFriendRequests = await executeQuery("SELECT * FROM friendRequests WHERE ((ownerAccountId = ? AND accountId = ?) OR (ownerAccountId = ? AND accountId = ?)) AND status = 'PENDING'", [req.query.accountId1, req.query.accountId2, req.query.accountId2, req.query.accountId1]);
        if (pendingFriendRequests.length > 0) {
            // the user is rejecting the request
            await executeQuery("DELETE FROM friendRequests WHERE ((ownerAccountId = ? AND accountId = ?) OR (ownerAccountId = ? AND accountId = ?)) AND status = 'PENDING'", [req.query.accountId1, req.query.accountId2, req.query.accountId2, req.query.accountId1]);
        } else {
            // the user is removing a friend
            await executeQuery("DELETE FROM friendRequests WHERE ((ownerAccountId = ? AND accountId = ?) OR (ownerAccountId = ? AND accountId = ?)) AND status = 'ACCEPTED'", [req.query.accountId1, req.query.accountId2, req.query.accountId2, req.query.accountId1]);
        }
        res.status(204).send();
    }
}
