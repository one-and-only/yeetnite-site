import { deflateSync, inflateSync } from 'zlib';
import { prisma } from '@lib/prisma';
import { createHash } from 'crypto';

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
            res.json({
                "uniqueFilename": "ClientSettings.Sav",
                "fileName": "ClientSettings.Sav",
                "hash": createHash('sha1').update(clientSettingsSav.clientSettings).digest('hex'),
                "hash256": createHash('sha256').update(clientSettingsSav.clientSettings).digest('hex'),
                "length": clientSettingsSav.clientSettings.length,
                "contentType": "application/octet-stream",
                "uploaded": clientSettingsSav.lastUpdated ? clientSettingsSav.lastUpdated : new Date(0).toISOString(), // close enough to when it was uploaded
                "storageType": "S3",
                "doNotCache": true
            });
        } else res.json([]);
    } else {
        switch (req.method) {
            case "PUT":
                const clientSettings = deflateSync(req.body.toString('base64')).toString('base64');
                await prisma.$queryRaw`UPDATE users SET clientSettings = ${clientSettings}, clientSettingsLastUpdated = ${new Date().toISOString()} WHERE username = ${req.query.accountId}`;
                res.status(204).send();
                break;
            case "GET":
                const clientSettingsSav = (await prisma.$queryRaw`SELECT clientSettings FROM users WHERE username = ${req.query.accountId}`)[0];
                if (!clientSettingsSav.clientSettings) {
                    res.status(204).send();
                    return;
                }

                res.setHeader('Content-Type', 'application/octet-stream');
                res.send(inflateSync(Buffer.from(clientSettingsSav.clientSettings, 'base64')).toString());
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