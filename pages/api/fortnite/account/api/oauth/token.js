import { executeQuery } from "@db";
import { randomBytes } from "crypto";

export default function token(req, res) {
    let response = {};
    let accessToken = randomBytes(8).toString('hex'); // generate a random access token

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST');

    const accessTokens = executeQuery();

    res.json(response);
}
/**
 * Make sure the access token that is generated does't already exist in the database
 * @param  {Array<string>} accessToken - Array of all the access tokens
 * @param  {string} toCheck - Access token to check if it exists
 */
function checkAccessTokens(accessToken, toCheck) {
    
}