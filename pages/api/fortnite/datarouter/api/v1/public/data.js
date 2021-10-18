import { cpus } from 'os';

export default function data(req, res) {
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
                    // TODO Use the CPU in the request JSON body instead of the server's CPU
                    "CPU": `${cpus()[0].model} @ ${cpus()[0].speed / 1000}GHz`
                }
            }
        );   
    }
}