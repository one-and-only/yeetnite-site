import { cpus } from 'os';

/*function makeIdPart(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}*/

export default function data(req, res) {
    // const gameSessionId = `{${makeIdPart(7)}-${makeIdPart(4)-makeIdPart(4)-makeIdPart(12)}}`;
    if (req.query.SessionID) {
        res.json(
            {
                "Events": {
                    "EventName": "Core.LoginFlow",
                    "DateOffset": "+00:00:32.669", // TODO: I should probably calculate this dynamically?
                    "GameSessionID": decodeURIComponent(req.query.SessionID),
                    "Platform": "Windows",
                    "ProviderType": "Client",
                    "GameState": "FortGameStateFrontEnd",
                    "Action": "Back",
                    "CPU": `${cpus()[0].model} @ ${cpus()[0].speed / 1000}GHz`
                }
            }
        );   
    }
}