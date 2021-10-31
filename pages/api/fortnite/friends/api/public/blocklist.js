import { executeQuery } from '../../../../../../includes/db';

export default async function blockList(req, res) {
    if (req.query.accountId) {
        const blockList = await executeQuery('SELECT blockList FROM users WHERE username = ?', [req.query.accountId]);
        // check if we are blocking a user or just getting the block list
        if (req.query.blocking) {
            if (req.method === "POST") {
                let updatedBlockList = JSON.parse(blockList[0].blockList);
                updatedBlockList.push(req.query.blocking);
                await executeQuery('UPDATE users SET blockList = ? WHERE username = ?', [JSON.stringify(updatedBlockList), req.query.accountId]);
                // unfriend the user if they're being blocked
                await executeQuery('DELETE FROM friendRequests WHERE (ownerAccountId = ? AND accountId = ?) OR (ownerAccountId = ? AND accountId = ?)', [req.query.accountId, req.query.blocking, req.query.blocking, req.query.accountId]);
                res.status(204).send();
            } else if (req.method === "DELETE") {
                let updatedBlockList = JSON.parse(blockList[0].blockList);
                updatedBlockList.splice(updatedBlockList.indexOf(req.query.blocking), 1);
                updatedBlockList.indexOf(req.query.blocking);
                await executeQuery('UPDATE users SET blockList = ? WHERE username = ?', [JSON.stringify(updatedBlockList), req.query.accountId]);
                res.status(204).send();
            } else {
                res.status(405).json({
                    success: false,
                    reason: `Cannot ${req.method} on blocklist endpoint`,
                });
            }
        } else {
            res.json(
                {
                    "blockedUsers": JSON.parse(blockList[0].blockList)
                }
            );
        }
    } else {
        res.status(400).json({
            status: "error",
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}