import { prisma } from '@lib/prisma';
import { randomBytes } from 'crypto';

/**
 * Fortnite <account/api/oauth/token | PUT,POST>
 * @param  {any} req
 * @param  {any} res
 */
export default async function token(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');

    if (req.body.grant_type == 'password' && req.body.username && req.body.token_type == 'eg1') {
        const user = await prisma.users.findFirst({
            select: {
                password: true,
                accessToken: true
            },
            where: {
                username: req.body.username
            }
        });
        if (!user || user.password !== req.body.password) {
            res.json({ success: false, reason: "Invalid username or password" });
            return;
        }

        res.json({
            "access_token": user.accessToken,
            "expires_in": 28800,
            "expires_at": "9999-12-02T01:12:00Z",
            "token_type": "bearer",
            "refresh_token": user.accessToken,
            "refresh_expires": 28800,
            "refresh_expires_at": "9999-12-02T01:12:00Z",
            "account_id": req.body.username,
            "client_id": "yeetniteclientlol",
            "internal_client": true,
            "client_service": "fortnite",
            "device_id": "yeetnitedeviceidlol",
            "app": "fortnite",
            "in_app_id": req.body.username
        });
    } else if (req.body.grant_type == 'external_auth' && req.body.external_auth_token && req.body.token_type == 'eg1') {
        const user = await prisma.users.findFirst({
            select: {
                username: true
            },
            where: {
                accessToken: req.body.external_auth_token
            }
        });
        if (!user) {
            res.json({ success: false, reason: "Invalid Auth Token during auto-login" });
            return;
        }

        res.json({
            "access_token": req.body.external_auth_token,
            "expires_in": 28800,
            "expires_at": "9999-12-02T01:12:00Z",
            "token_type": "bearer",
            "refresh_token": req.body.external_auth_token,
            "refresh_expires": 28800,
            "refresh_expires_at": "9999-12-02T01:12:00Z",
            "account_id": user.username,
            "client_id": "yeetniteclientlol",
            "internal_client": true,
            "client_service": "fortnite",
            "device_id": "yeetnitedeviceidlol",
            "app": "fortnite",
            "in_app_id": user.username
        });
    } else {
        res.json({
            "access_token": randomBytes(8).toString('hex'),
            "client_id": "yeetniteclientlol",
            "client_service": "fortnite",
            "expires_at": "9999-12-02T01:12:00Z",
            "expires_in": 28800,
            "internal_client": true,
            "token_type": "bearer"
        });
    }
}
