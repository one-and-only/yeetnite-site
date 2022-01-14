export default async function friends(req, res) {
    if (req.query.accountId) {
        res.json(await (await fetch(`https://${process.env.DBAPI_HOST}/friend_requests?accountId=${req.query.accountId}`)).json());
    } else {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}