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
                await prisma.users.update({
                    data: {
                        clientSettings: Buffer.from(deflateSync(req.body.toString('base64')).toString('base64')),
                        clientSettingsLastUpdated: new Date().toISOString()
                    },
                    where: {
                        username: req.query.accountId
                    }
                });
                res.status(204).send();
                break;
            case "GET":
                const clientSettingsSav = (await prisma.users.findFirst({
                    select: {
                        clientSettings: true
                    },
                    where: {
                        username: req.query.accountId
                    }
                })).clientSettings;
                if (clientSettingsSav) {
                    res.setHeader('Content-Type', 'application/octet-stream');
                    res.send(Buffer.from(inflateSync(Buffer.from(clientSettingsSav.clientSettings.toString(), 'base64')).toString(), 'base64'));
                }
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