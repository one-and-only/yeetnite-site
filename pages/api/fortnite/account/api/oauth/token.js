import { executeQuery } from "../../../../../../includes/db"; // would have loved if jsconfig paths worked :(
import { randomBytes } from "crypto";

var accessToken = randomBytes(8).toString('hex'); // generate a random access token

export default function token(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');

    executeQuery('SELECT accessToken FROM users', null, processAccessTokens);

    function processAccessTokens(accessTokenMap) {
        // TODO Finish this up!
        console.log(accessTokenMap);
        res.json(accessTokenMap.get('fields'));
    }
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
    if (changeAccessToken) {
        accessToken = randomBytes(8).toString('hex');
        checkAccessTokens(accessTokens, accessToken);
    }
}