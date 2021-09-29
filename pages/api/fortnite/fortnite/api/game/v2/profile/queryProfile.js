import { executeQuery } from '../../../../../../../../includes/db';

export default async function queryProfile(req, res) {
    if (req.query.accountId && req.query.profileId) {
        switch (req.query.profileId) {
            // TODO make personalization options and 'created' and 'updated' time dynamic (Needs some database work?)
            case 'athena':
                let athena = require('./profiles/athena.json');
                const userDataAthena = await executeQuery('SELECT created, lastLogin FROM users WHERE username = ?', [req.query.accountId]);
                athena.created = userDataAthena[0].created;
                athena.updated = userDataAthena[0].lastLogin;
                athena.accountId = req.query.accountId;
                res.json(athena);
                break;
            case 'common_core':
                let common_core = require('./profiles/common_core.json');
                const userDataCommonCore = await executeQuery('SELECT created, lastLogin FROM users WHERE username = ?', [req.query.accountId]);
                common_core.created = userDataCommonCore[0].created;
                common_core.updated = userDataCommonCore[0].lastLogin;
                common_core.accountId = req.query.accountId;
                res.json(common_core);
                break;
            case 'common_public':
                let common_public = require('./profiles/common_public.json');
                const userDataCommonPublic = await executeQuery('SELECT created, lastLogin FROM users WHERE username = ?', [req.query.accountId]);
                common_public.created = userDataCommonPublic[0].created;
                common_public.updated = userDataCommonPublic[0].lastLogin;
                common_public.accountId = req.query.accountId;
                common_public.stats.attributes.homebase_name = req.query.accountId;
                res.json(common_public);
                break;
            default:
                res.status(400).json({
                    success: false,
                    reason: `Invalid \`profileId\` of \`${req.query.profileId}\``
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