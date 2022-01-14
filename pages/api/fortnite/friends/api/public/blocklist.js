export default async function blockList(req, res) {
    if (req.query.accountId) {
        // check if we are blocking a user or just getting the block list
        if (req.query.blocking) {
            if (req.method === "POST") {
                await fetch(`https://${process.env.DBAPI_HOST}/block_user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(req.query)
                });
                res.status(204).send();
            } else if (req.method === "DELETE") {
                await fetch(`https://${process.env.DBAPI_HOST}/unblock_user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(req.query)
                });
                res.status(204).send();
            } else {
                res.status(405).json({
                    success: false,
                    reason: `Cannot ${req.method} on blocklist endpoint`,
                });
            }
        } else {
            res.json(await (await fetch(`https://${process.env.DBAPI_HOST}/blocklist?accountId=${encodeURIComponent(req.query.accountId)}`)).json());
        }
    } else {
        res.status(400).json({
            status: "error",
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}