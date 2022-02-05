import { createHash } from 'crypto';

export default async function cloudStorage(req, res) {
    if (req.query.accountId) {
        let response = await fetch(`https://${process.env.DBAPI_HOST}/client_settings_sav?username=${encodeURIComponent(req.query.accountId)}`);
        if (response.status == 200) {
            response = await response.json();
            res.json({
                "uniqueFilename": "ClientSettings.Sav",
                "fileName": "ClientSettings.Sav",
                "hash": createHash('sha1').update(response.text, 'utf-8').digest('hex'),
                "hash256": createHash('sha256').update(response.text, 'utf-8').digest('hex'),
                "length": response.text.length,
                "contentType": "application/octet-stream",
                "uploaded": response.lastLogin, // close enough to when it was uploaded
                "storageType": "S3",
                "doNotCache": true
            });
        }
        else
            res.json([]);
    } else {
        res.json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
    }
}