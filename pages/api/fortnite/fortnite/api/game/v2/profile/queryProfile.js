import { executeQuery } from '../../../../../../../../includes/db';

export default async function queryProfile(req, res) {
    if (req.query.accountId && req.query.profileId) {
        const serverTime = new Date().toISOString();
        switch (req.query.profileId) {
            // TODO make personalization options and 'created' and 'updated' time dynamic (Needs some database work?)
            case 'athena':
                let athena = require('./profiles/athena.json');
                const userDataAthena = (await executeQuery('SELECT created, lastLogin FROM users WHERE username = ?', [req.query.accountId]))[0];
                const lockerData = (await executeQuery('SELECT locker.favorite_victorypose, locker.favorite_consumableemote, locker.banner_color, locker.favorite_callingcard, locker.favorite_character, locker.favorite_spray, locker.favorite_loadingscreen, locker.favorite_hat, locker.favorite_battlebus, locker.favorite_mapmarker, locker.favorite_vehicledeco, locker.favorite_backpack, locker.favorite_dance, locker.favorite_skydivecontrail, locker.favorite_pickaxe, locker.favorite_glider, locker.favorite_musicpack, locker.favorite_itemwraps, locker.banner_icon FROM locker INNER JOIN users ON users.user_id = locker.user_id WHERE users.username = ?', [req.query.accountId]))[0];
                // Change some profile time data to be dynamic per user
                athena.profileChanges[0].profile.created = userDataAthena.created;
                athena.profileChanges[0].profile.updated = userDataAthena.lastLogin;
                athena.profileChanges[0].profile.accountId = req.query.accountId;
                athena.serverTime = serverTime;
                // custom locker items
                athena.profileChanges[0].profile.stats.attributes.favorite_victorypose = lockerData.favorite_victorypose;
                athena.profileChanges[0].profile.stats.attributes.favorite_consumableemote = lockerData.favorite_consumableemote;
                athena.profileChanges[0].profile.stats.attributes.banner_color = lockerData.banner_color;
                athena.profileChanges[0].profile.stats.attributes.favorite_callingcard = lockerData.favorite_callingcard;
                athena.profileChanges[0].profile.stats.attributes.favorite_character = lockerData.favorite_character;
                athena.profileChanges[0].profile.stats.attributes.favorite_spray = JSON.parse(lockerData.favorite_spray);
                athena.profileChanges[0].profile.stats.attributes.favorite_loadingscreen = lockerData.favorite_loadingscreen;
                athena.profileChanges[0].profile.stats.attributes.favorite_hat = lockerData.favorite_hat;
                athena.profileChanges[0].profile.stats.attributes.favorite_battlebus = lockerData.favorite_battlebus;
                athena.profileChanges[0].profile.stats.attributes.favorite_mapmarker = lockerData.favorite_mapmarker;
                athena.profileChanges[0].profile.stats.attributes.favorite_vehicledeco = lockerData.favorite_vehicledeco;
                athena.profileChanges[0].profile.stats.attributes.favorite_backpack = lockerData.favorite_backpack;
                athena.profileChanges[0].profile.stats.attributes.favorite_dance = JSON.parse(lockerData.favorite_dance);
                athena.profileChanges[0].profile.stats.attributes.favorite_skydivecontrail = lockerData.favorite_skydivecontrail;
                athena.profileChanges[0].profile.stats.attributes.favorite_pickaxe = lockerData.favorite_pickaxe;
                athena.profileChanges[0].profile.stats.attributes.favorite_glider = lockerData.favorite_glider;
                athena.profileChanges[0].profile.stats.attributes.favorite_musicpack = lockerData.favorite_musicpack;
                athena.profileChanges[0].profile.stats.attributes.favorite_itemwraps = JSON.parse(lockerData.favorite_itemwraps);
                athena.profileChanges[0].profile.stats.attributes.banner_icon = lockerData.banner_icon;
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