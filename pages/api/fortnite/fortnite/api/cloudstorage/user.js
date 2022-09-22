import { prisma } from '@lib/prisma';
import { createHash } from 'crypto';
import getRawBody from 'raw-body';
import { deflateSync, inflateSync } from 'zlib';

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function clientSettingsSav(req, res) {
    if (!(req.query.accountId)) {
        res.status(400).json({
            success: false,
            reason: "Failed to provide a username"
        });
        return;
    }

    if (req.query.fileInfo === "true") {
        const clientSettingsSav = await prisma.users.findFirst({
            select: {
                clientSettings: true,
                clientSettingsLastUpdated: true
            },
            where: {
                username: req.query.accountId
            }
        });
        if (clientSettingsSav.clientSettings) {
            const clientSettings = Buffer.from(inflateSync(Buffer.from(clientSettingsSav.clientSettings, 'base64')).toString(), 'base64');
            res.json({
                "uniqueFilename": "ClientSettings.Sav",
                "fileName": "ClientSettings.Sav",
                "hash": createHash('sha1').update(clientSettings).digest('hex'),
                "hash256": createHash('sha256').update(clientSettings).digest('hex'),
                "length": clientSettings.length,
                "contentType": "application/octet-stream",
                "uploaded": clientSettingsSav.lastUpdated ? clientSettingsSav.lastUpdated : new Date(0).toISOString(), // close enough to when it was uploaded
                "storageType": "S3",
                "doNotCache": true
            });
        } else res.json([]);
    } else {
        switch (req.method) {
            case "PUT":
                getRawBody(req, {
                    length: req.headers['content-length'],
                    limit: '16mb',
                }, async function (err, buffer) {
                    if (err) console.log("error:", err);
                    await prisma.users.update({
                        data: {
                            clientSettings: deflateSync(buffer.toString('base64')).toString('base64'),
                            clientSettingsLastUpdated: new Date().toISOString()
                        },
                        where: {
                            username: req.query.accountId
                        }
                    });
                    res.status(204).send();
                });
                break;
            case "GET":
                const clientSettingsSav = await prisma.users.findFirst({
                    select: {
                        clientSettings: true
                    },
                    where: {
                        username: req.query.accountId
                    }
                });
                if (!clientSettingsSav.clientSettings) {
                    res.status(204).send();
                    return;
                }

                res.setHeader('Content-Type', 'application/octet-stream');
                res.send(Buffer.from(inflateSync(Buffer.from(clientSettingsSav.clientSettings, 'base64')).toString(), 'base64'));
                break;
            default:
                res.status(400).json({
                    success: false,
                    reason: `Invalid request method of \`${req.method}\``
                });
                break;
        }
    }
}