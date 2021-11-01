import { executeQuery } from "../../../../../../includes/db"; // would have loved if jsconfig paths worked :(
import { randomBytes } from "crypto";

var accessToken = randomBytes(8).toString('hex'); // generate a random access token

/**
 * Fortnite <account/api/oauth/token | PUT,POST>
 * @param  {any} req
 * @param  {any} res
 */
export default async function token(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');

    executeQuery('SELECT accessToken FROM users').then(result => {
        if (req.body.grant_type == 'password' && req.body.username && req.body.token_type == 'eg1') {
            executeQuery('SELECT password, accessToken FROM users WHERE username = ?', [req.body.username]).then(async user => {
                if (user.length > 0) {
                    if (user[0].password == req.body.password) {
                        // set an access token if the user doesn't have one
                        if (user[0].accessToken === null) {
                            checkAccessTokens(result, accessToken);
                            await executeQuery('UPDATE users SET accessToken = ? WHERE username = ?', [accessToken, req.body.username])
                        }
                        const localToken = (user[0].accessToken === null) ? accessToken : user[0].accessToken;
                        res.json({
                            "access_token": localToken,
                            "expires_in": 28800,
                            "expires_at": "9999-12-02T01:12:00Z",
                            "token_type": "bearer",
                            "refresh_token": localToken,
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
                    } else {
                        res.json({ status: 'error', reason: 'Invalid password' });
                    }
                } else {
                    res.json({ status: 'error', reason: 'Invalid username' });
                }
            });
        } else {
            res.json({
                "access_token": accessToken,
                "client_id": "yeetniteclientlol",
                "client_service": "fortnite",
                "expires_at": "9999-12-02T01:12:00Z",
                "expires_in": 28800,
                "internal_client": true,
                "token_type": "bearer"
            });
        }

        // Node.js is not session based
        // it will continue to hold its state
        // so the next user will get an identical token
        accessToken = randomBytes(8).toString('hex');
    }).catch(err => {
        res.json({ status: 'error', reason: err });
    });
}
/**
 * Make sure the access token that is generated does't already exist in the database
 * @param  {Array<string>} accessTokens - Array of all the access tokens
 * @param  {string} toCheck - Access token to check if it exists
 */
function checkAccessTokens(accessTokens, toCheck) {
    let changeAccessToken = false;
    for (let i = 0; i < accessTokens.length; i++) {
        (accessTokens[i] == toCheck) ? changeAccessToken = true : null;
    }
    // only change if necessary
    if (changeAccessToken) {
        accessToken = randomBytes(8).toString('hex');
        checkAccessTokens(accessTokens, accessToken);
    }
}