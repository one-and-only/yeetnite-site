import { prisma } from '@lib/prisma';

async function getCreatedLastLogin(username) {
    return await prisma.users.findFirst({
        select: {
            created: true,
            lastLogin: true
        },
        where: {
            username: username
        }
    });
}

export default async function queryProfile(req, res) {
    if (!(req.query.accountId && req.query.profileId)) {
        res.status(400).json({
            success: false,
            reason: "We have received invalid data and are unable to process your request."
        });
        return;
    }

    const serverTime = new Date().toISOString();
    const createdLastLogin = await getCreatedLastLogin(req.query.accountId);
    switch (req.query.profileId) {
        case 'athena':
            let athena = require('./profiles/athena.json');
            const lockerData = (await prisma.$queryRaw`SELECT locker.favorite_victorypose, locker.favorite_consumableemote, locker.banner_color, locker.favorite_callingcard, locker.favorite_character, locker.favorite_spray, locker.favorite_loadingscreen, locker.favorite_hat, locker.favorite_battlebus, locker.favorite_mapmarker, locker.favorite_vehicledeco, locker.favorite_backpack, locker.favorite_dance, locker.favorite_skydivecontrail, locker.favorite_pickaxe, locker.favorite_glider, locker.favorite_musicpack, locker.favorite_itemwraps, locker.banner_icon FROM locker INNER JOIN users ON users.user_id = locker.user_id WHERE users.username = ${req.query.accountId}`)[0];
            // Change some profile time data to be dynamic per user
            athena.profileChanges[0].profile.created = createdLastLogin.created;
            athena.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
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
            common_core.profileChanges[0].profile.created = createdLastLogin.created;
            common_core.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            common_core.profileChanges[0].profile.accountId = req.query.accountId;
            common_core.serverTime = serverTime;
            res.json(common_core);
            break;
        case 'common_public':
            let common_public = require('./profiles/common_public.json');
            common_public.profileChanges[0].profile.created = createdLastLogin.created;
            common_public.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            common_public.profileChanges[0].profile.accountId = req.query.accountId;
            common_public.profileChanges[0].profile.stats.attributes.homebase_name = req.query.accountId;
            common_public.serverTime = serverTime;
            res.json(common_public);
            break;
        case 'profile0':
            let profile0 = require('./profiles/profile0.json');
            profile0.profileChanges[0].profile.created = createdLastLogin.created;
            profile0.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            profile0.profileChanges[0].profile.accountId = req.query.accountId;
            profile0.serverTime = serverTime;
            res.json(profile0);
            break;
        case 'collection_book_people0':
            let collection_book_people0 = require('./profiles/collection_book_people0.json');
            collection_book_people0.serverTime = serverTime;
            collection_book_people0.profileChanges[0].profile.accountId = req.query.accountId;
            collection_book_people0.profileChanges[0].profile.created = createdLastLogin.created;
            collection_book_people0.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            res.json(collection_book_people0);
            break;
        case 'collection_book_schematics0':
            let collection_book_schematics0 = require('./profiles/collection_book_schematics0.json');
            collection_book_schematics0.serverTime = serverTime;
            collection_book_schematics0.profileChanges[0].profile.accountId = req.query.accountId;
            collection_book_schematics0.profileChanges[0].profile.created = createdLastLogin.created;
            collection_book_schematics0.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            res.json(collection_book_schematics0);
            break;
        case 'campaign':
            let campaign = require('./profiles/campaign.json');
            campaign.serverTime = serverTime;
            campaign.profileRevision = parseInt(req.query.rvn);
            campaign.profileChangesBaseRevision = parseInt(req.query.rvn);
            campaign.profileCommandRevision = parseInt(req.query.rvn) - 10;
            res.json(campaign);
            break;
        default:
            res.status(400).json({
                success: false,
                reason: `Invalid \`profileId\` of \`${req.query.profileId}\``
            });
            break;
    }
}