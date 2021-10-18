import { executeQuery } from '../../../../../../includes/db';

export default function account(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');
    if (req.query.fullAccountInfo === 'true') {
        executeQuery('SELECT lastLogin, email, preferredLanguage FROM users WHERE username = ?', [req.query.accountId]).then(async result => {
            await executeQuery('UPDATE users set lastLogin = ? WHERE username = ?', [new Date().toISOString(), req.query.accountId]);
            res.json(
                {
                    "id": req.query.accountId,
                    "displayName": req.query.accountId,
                    "name": "placeholder",
                    "lastName": "placeholder",
                    "email": result[0].email,
                    "failedLoginAttempts": 0,
                    "lastLogin": (result[0].lastLogin) ? result[0].lastLogin : new Date().toISOString(),
                    "numberOfDisplayNameChanges": 0,
                    "ageGroup": "UNKNOWN",
                    "headless": false,
                    "country": "US",
                    "preferredLanguage": result[0].preferredLanguage,
                    "tfaEnabled": false
                }
            );
        });
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