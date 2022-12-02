import { prisma } from '@lib/prisma';
import { getFortniteVersion } from '@lib/seasonUtils';

export default async function account(req, res) {
    if (req.query.fullAccountInfo === 'true') {
        const user = await prisma.users.findFirst({
            select: {
                lastLogin: true,
                email: true,
                username: true,
                preferredLanguage: true
            },
            where: {
                username: req.query.accountId
            }
        });
        if (!user) {
            res.json({ success: false, reason: "Account not found" });
            return;
        }

        const lastLogin = new Date().toISOString();
        await prisma.users.update({
            data: {
                lastLogin: lastLogin
            },
            where: {
                username: req.query.accountId
            }
        });

        res.json(
            {
                "id": req.query.accountId || "Invalid",
                "displayName": req.query.accountId || "Invalid",
                "name": "placeholder",
                "lastName": "placeholder",
                "email": user.email || "Invalid",
                "failedLoginAttempts": 0,
                "lastLogin": (user.lastLogin) ? user.lastLogin : new Date().toISOString(),
                "numberOfDisplayNameChanges": 0,
                "ageGroup": "UNKNOWN",
                "headless": false,
                "country": "US",
                "preferredLanguage": user.preferredLanguage,
                "tfaEnabled": false
            }
        );
    } else {
        if (typeof req.query.accountId === 'object') {
            const versionInfo = getFortniteVersion(req.headers["user-agent"]);
            if (versionInfo.season < 6)
                res.json({
                    id: req.query.accountId,
                    displayName: req.query.accountId,
                    externalAuths: {}
                });
            else res.json(req.query.accountId.map(id => { return { "id": id, "displayName": id, "externalAuths": {}} }));
        } else {
            res.json(
                [
                    {
                        "id": req.query.accountId,
                        "displayName": req.query.accountId,
                        "externalAuths": {}
                    }
                ]
            );
        }
    }
}