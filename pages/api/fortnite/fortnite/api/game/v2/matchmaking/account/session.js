export default function session(req, res) {
    res.json({
        "accountId": req.query.accountId,
        "sessionId": req.query.sessionId,
        "key": "AOJEv8uTFmUh7XM2328kq9rlAzeQ5xzWzPIiyKn2s7s=" // TODO: Make key dynamic just in case it needs to be for each player?
    })
}