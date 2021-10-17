import { executeQuery } from '../../../../../../../../includes/db';

export default async function queryProfile(req, res) {
    if (req.query.accountId && req.query.profileId) {
        const serverTime = new Date().toISOString();
        switch (req.query.profileId) {
            // TODO make personalization options and 'created' and 'updated' time dynamic (Needs some database work?)
            case 'athena':
                let athena = require('./profiles/athena.json');
                const userDataAthena = await executeQuery('SELECT created, lastLogin FROM users WHERE username = ?', [req.query.accountId]);
                // Change some data to be dynamic per user
                athena.profileChanges[0].profile.created = userDataAthena[0].created;
                athena.profileChanges[0].profile.updated = userDataAthena[0].lastLogin;
                athena.profileChanges[0].profile.accountId = req.query.accountId;
                athena.serverTime = serverTime;
                res.json(athena);
                break;
            case 'common_core':
                let common_core = require('./profiles/common_core.json');
                const userDataCommonCore = await executeQuery('SELECT created, lastLogin FROM users WHERE username = ?', [req.query.accountId]);
                // Change some data to be dynamic per user
                common_core.profileChanges[0].profile.created = userDataCommonCore[0].created;
                common_core.profileChanges[0].profile.updated = userDataCommonCore[0].lastLogin;
                common_core.profileChanges[0].profile.accountId = req.query.accountId;
                common_core.serverTime = serverTime;
                res.json(common_core);
                break;
            case 'common_public':
                let common_public = require('./profiles/common_public.json');
                const userDataCommonPublic = await executeQuery('SELECT created, lastLogin FROM users WHERE username = ?', [req.query.accountId]);
                // Change some data to be dynamic per user
                common_public.profileChanges[0].profile.created = userDataCommonPublic[0].created;
                common_public.profileChanges[0].profile.updated = userDataCommonPublic[0].lastLogin;
                common_public.profileChanges[0].profile.accountId = req.query.accountId;
                common_public.profileChanges[0].profile.stats.attributes.homebase_name = req.query.accountId;
                common_public.serverTime = serverTime;
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