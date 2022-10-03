import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function verify(req) {
    return edgeResponse({
        access_token: req.headers.get('authorization').slice(7),
        "client_id": "yeetniteclientlol",
        "client_service": "fortnite",
        "expires_at": "9999-12-02T01:12:00Z",
        "expires_in": 28800,
        "internal_client": true,
        "token_type": "bearer"
    });
}