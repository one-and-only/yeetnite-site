import { prisma } from '@lib/prisma';

export default async function account(req, res) {
    // only allow PUT/POST method
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');

    if (req.query.fullAccountInfo === 'true') {
        // get user info from username
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
        }

        // update last login time
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
                "preferredLanguage": user.preferredLanguage || "en",
                "tfaEnabled": false
            }
        );
    } else {
        if (typeof req.query.accountId === 'object') {
            switch (req.headers["user-agent"]) {
                case "game=Fortnite, engine=UE4, build=++Fortnite+Release-Cert-CL-3741772":
                    res.json({
                        id: req.query.accountId,
                        displayName: req.query.accountId,
                        externalAuths: req.query.accountId
                    });
                    break;
                default:
                    res.json(req.query.accountId.map(id => { return { "id": id, "displayName": id, "externalAuths": {}} }));
                    break;
            }
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