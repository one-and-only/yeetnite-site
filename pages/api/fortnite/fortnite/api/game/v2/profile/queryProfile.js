import { prisma } from '@lib/prisma';
import { getFortniteVersion } from '@lib/seasonUtils';

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
            let athena = await import('./profiles/athena.json');
            const userInfo = await prisma.users.findFirst({
                select: {
                    user_id: true
                },
                where: {
                    username: req.query.accountId
                }
            });
            const lockerData = await prisma.locker.findFirst({
                select: {
                    favorite_victorypose: true,
                    favorite_consumableemote: true,
                    banner_color: true,
                    favorite_callingcard: true,
                    favorite_character: true,
                    favorite_spray: true,
                    favorite_loadingscreen: true,
                    favorite_hat: true,
                    favorite_battlebus: true,
                    favorite_mapmarker: true,
                    favorite_vehicledeco: true,
                    favorite_backpack: true,
                    favorite_dance: true,
                    favorite_skydivecontrail: true,
                    favorite_pickaxe: true,
                    favorite_glider: true,
                    favorite_musicpack: true,
                    favorite_itemwrap: true,
                    banner_icon: true
                },
                where: {
                    user_id: userInfo.user_id
                }
            });
            // Change some profile time data to be dynamic per user
            athena.profileChanges[0].profile.created = createdLastLogin.created;
            athena.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            athena.profileChanges[0].profile.accountId = req.query.accountId;
            athena.profileChanges[0].profile.stats.attributes.season_num = getFortniteVersion(req.headers["user-agent"]).season;
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
            athena.profileChanges[0].profile.stats.attributes.favorite_itemwraps = JSON.parse(lockerData.favorite_itemwrap);
            athena.profileChanges[0].profile.stats.attributes.banner_icon = lockerData.banner_icon;
            athena.default.serverTime = serverTime;
            res.json(athena);
            break;
        case 'common_core':
            let common_core = await import('./profiles/common_core.json');
            common_core.profileChanges[0].profile.created = createdLastLogin.created;
            common_core.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            common_core.profileChanges[0].profile.accountId = req.query.accountId;
            common_core.default.serverTime = serverTime;
            res.json(common_core);
            break;
        case 'common_public':
            let common_public = await import('./profiles/common_public.json');
            common_public.profileChanges[0].profile.created = createdLastLogin.created;
            common_public.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            common_public.profileChanges[0].profile.accountId = req.query.accountId;
            common_public.profileChanges[0].profile.stats.attributes.homebase_name = req.query.accountId;
            common_public.default.serverTime = serverTime;
            res.json(common_public);
            break;
        case 'profile0':
            let profile0 = await import('./profiles/profile0.json');
            profile0.profileChanges[0].profile.created = createdLastLogin.created;
            profile0.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            profile0.profileChanges[0].profile.accountId = req.query.accountId;
            profile0.default.serverTime = serverTime;
            res.json(profile0);
            break;
        case 'collection_book_people0':
            let collection_book_people0 = await import('./profiles/collection_book_people0.json');
            collection_book_people0.profileChanges[0].profile.accountId = req.query.accountId;
            collection_book_people0.profileChanges[0].profile.created = createdLastLogin.created;
            collection_book_people0.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            collection_book_people0.default.serverTime = serverTime;
            res.json(collection_book_people0);
            break;
        case 'collection_book_schematics0':
            let collection_book_schematics0 = await import('./profiles/collection_book_schematics0.json');
            collection_book_schematics0.profileChanges[0].profile.accountId = req.query.accountId;
            collection_book_schematics0.profileChanges[0].profile.created = createdLastLogin.created;
            collection_book_schematics0.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            collection_book_schematics0.default.serverTime = serverTime;
            res.json(collection_book_schematics0);
            break;
        case 'campaign':
            let campaign = await import('./profiles/campaign.json');
            campaign.default.profileRevision = parseInt(req.query.rvn);
            campaign.default.profileChangesBaseRevision = parseInt(req.query.rvn);
            campaign.default.profileCommandRevision = parseInt(req.query.rvn) - 10;
            campaign.default.serverTime = serverTime;
            res.json(campaign);
            break;
        case 'metadata':
            let metadata = await import('./profiles/metadata.json');
            metadata.profileChanges[0].profile.accountId = req.query.accountId;
            metadata.profileChanges[0].profile.created = createdLastLogin.created;
            metadata.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            metadata.default.serverTime = serverTime;
            res.json(metadata);
            break;
        case 'theater0':
            let theater0 = await import('./profiles/theater0.json');
            theater0.profileChanges[0].profile.accountId = req.query.accountId;
            theater0.profileChanges[0].profile.created = createdLastLogin.created;
            theater0.profileChanges[0].profile.updated = createdLastLogin.lastLogin;
            theater0.default.serverTime = serverTime;
            res.json(theater0);
            break;
        case 'outpost0':
            let outpost0 = await import('./profiles/outpost0.json');
            outpost0.profileChanges[0].profile.accountId = req.query.accountId;
            outpost0.profileChanges[0].profile.created = createdLastLogin.created;
            outpost0.profileChanges[0].profile.updated = createdLastLogin.updated;
            outpost0.default.serverTime = serverTime;
            res.json(outpost0);
            break;
        default:
            res.status(400).json({
                success: false,
                reason: `Invalid \`profileId\` of \`${req.query.profileId}\``
            });
            break;
    }
}