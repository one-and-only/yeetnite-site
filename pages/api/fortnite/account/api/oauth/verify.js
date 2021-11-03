export default function verify(req, res) {
    res.json({
        access_token: req.headers.authorization.slice(7),
        "client_id": "yeetniteclientlol",
        "client_service": "fortnite",
        "expires_at": "9999-12-02T01:12:00Z",
        "expires_in": 28800,
        "internal_client": true,
        "token_type": "bearer"
    });
}