// ! Remove when in production
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// we need access to the raw ClientSettings.Sav data,
// so disable the body parser
export const config = {
    api: {
        bodyParser: false,
    },
}

export default function clientSettings(req, res) {
    if (req.query.accountId) {
        switch (req.method) {
            case 'GET':
                res.json({
                    success: false,
                    reason: 'GET not supported yet',
                });
                break;
            case 'PUT':
                return new Promise((resolve) => {
                    if (!req.body) {
                        let buffer = '';
                        req.on('data', (chunk) => {
                            buffer += chunk;
                        })

                        req.on('end', async () => {
                            await fetch('https://localhost:8443/client_settings_sav', {
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
            default:
                res.json({
                    success: false,
                    reason: 'Method `' + req.method + '` not supported',
                });
                break;
        }
    } else {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}