// we need access to the raw ClientSettings.Sav data,
// so disable the body parser
export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function clientSettings(req, res) {
    if (req.query.accountId) {
        if (req.method === 'PUT') {
            return new Promise((resolve) => {
                if (!req.body) {
                    let buffer = '';
                    req.on('data', (chunk) => {
                        buffer += chunk;
                    })

                    req.on('end', async () => {
                        await fetch(`https://${process.env.DBAPI_HOST}/client_settings_sav`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                fileContents: Buffer.from(buffer).toString(),
                                username: req.query.accountId
                            })
                        });
                        res.status(204).send();
                        resolve(true);
                    })
                }
            });
        } else if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/octet-stream');
            res.send((await (await fetch(`https://${process.env.DBAPI_HOST}/client_settings_sav?username=${encodeURIComponent(req.query.accountId)}`)).json()).text);
        } else {
            res.json({
                success: false,
                reason: 'Method `' + req.method + '` not supported',
            });
        }
    } else {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}