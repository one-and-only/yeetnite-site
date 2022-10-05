import { prisma } from '@lib/prisma';

export default async function session(req, res) {
  const sessionInfo = await prisma.matchmaking_sessions.findFirst({
    select: {
      ownerId: true,
      ownerName: true,
      serverName: true,
      serverAddress: true,
      serverPort: true,
      maxPublicPlayers: true,
      openPublicPlayers: true,
      attributes: true,
      publicPlayers: true
    },
    where: {
      id_string: req.query.session_id
    }
  });
  if (!sessionInfo) {
    res.status(400).send();
    return;
  }

  res.json({
    "id": req.query.session_id,
    "ownerId": sessionInfo.ownerId,
    "ownerName": sessionInfo.ownerName,
    "serverName": sessionInfo.serverName,
    "serverAddress": sessionInfo.serverAddress,
    "serverPort": sessionInfo.serverPort,
    "maxPublicPlayers": sessionInfo.maxPublicPlayers,
    "openPublicPlayers": sessionInfo.openPublicPlayers,
    "maxPrivatePlayers": 0,
    "openPrivatePlayers": 0,
    "attributes": JSON.parse(sessionInfo.attributes),
    "publicPlayers": JSON.parse(sessionInfo.publicPlayers),
    "privatePlayers": [],
    "totalPlayers": sessionInfo.maxPublicPlayers - sessionInfo.openPublicPlayers,
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