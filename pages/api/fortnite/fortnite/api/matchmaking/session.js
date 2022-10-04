import { v4 as uuidV4 } from 'uuid';

export default function session(req, res) {
    res.json({
        "id": req.query.session_id,
        "ownerId": uuidV4().replace(/-/ig, "").toUpperCase(),
        "ownerName": "YEETNITE-NAE-1",
        "serverName": "YEETNITE-NAE-1",
        "serverAddress": "127.0.0.1",
        "serverPort": 9999,
        "maxPublicPlayers": 100,
        "openPublicPlayers": 100,
        "maxPrivatePlayers": 0,
        "openPrivatePlayers": 0,
        "attributes": {
          "REGION_s": "NA",
          "GAMEMODE_s": "FORTATHENA",
          "ALLOWBROADCASTING_b": true,
          "SUBREGION_s": "MN",
          "DCID_s": "YEETNITE-NAE",
          "tenant_s": "Fortnite",
          "MATCHMAKINGPOOL_s": "Any",
          "STORMSHIELDDEFENSETYPE_i": 0,
          "HOTFIXVERSION_i": 0,
          "PLAYLISTNAME_s": "Playlist_DefaultSolo",
          "SESSIONKEY_s": uuidV4().replace(/-/ig, "").toUpperCase(),
          "TENANT_s": "Fortnite",
          "BEACONPORT_i": 15009
        },
        "publicPlayers": [],
        "privatePlayers": [],
        "totalPlayers": 0,
        "allowJoinInProgress": false,
        "shouldAdvertise": false,
        "isDedicated": false,
        "usesStats": false,
        "allowInvites": false,
        "usesPresence": false,
        "allowJoinViaPresence": true,
        "allowJoinViaPresenceFriendsOnly": false,
        "buildUniqueId": req.cookies.currentbuildUniqueId || "0", // buildUniqueId is different for every build, this uses the netver of the version you're currently using
        "lastUpdated": new Date().toISOString(),
        "started": false
      });
}