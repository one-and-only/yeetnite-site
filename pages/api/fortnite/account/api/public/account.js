import { executeQuery } from '../../../../../../includes/db';

export default function account(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');
    if (req.query.fullAccountInfo === 'true') {
        executeQuery('SELECT lastLogin, email, preferredLanguage, username FROM users WHERE username = ?', [req.query.accountId]).then(async result => {
            if (result.length === 0) {
                res.status(400).send({
                    success: false,
                    error: 'Account not found'
                });
            } else {
                await executeQuery('UPDATE users set lastLogin = ? WHERE username = ?', [new Date().toISOString(), req.query.accountId]);
                res.json(
                    {
                        "id": result[0].username || "Invalid",
                        "displayName": result[0].username || "Invalid",
                        "name": "placeholder",
                        "lastName": "placeholder",
                        "email": result[0].email || "Invalid",
                        "failedLoginAttempts": 0,
                        "lastLogin": (result[0].lastLogin) ? result[0].lastLogin : new Date().toISOString(),
                        "numberOfDisplayNameChanges": 0,
                        "ageGroup": "UNKNOWN",
                        "headless": false,
                        "country": "US",
                        "preferredLanguage": result[0].preferredLanguage || "en",
                        "tfaEnabled": false
                    }
                );
            }
        });
    } else {
        if (typeof req.query.accountId === 'object') {
            let userInfo = [];
            for (let i = 0; i < req.query.accountId.length; i++) {
                userInfo.push(
                    {
                        "id": req.query.accountId[i],
                        "displayName": req.query.accountId[i],
                        "externalAuths": {}
                    }
                );
            }
            res.json(userInfo);
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