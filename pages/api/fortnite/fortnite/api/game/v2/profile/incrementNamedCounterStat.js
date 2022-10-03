import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function incrementNamedCounterStat(req, res) {
    const serverTime = new Date().toISOString();
    const { searchParams } = new URL(req.url);

    switch (searchParams.get("profileId")) {
        case 'profile0':
            return edgeResponse({
                "profileRevision": searchParams.get("rvn"),
                "profileId": "profile0",
                "profileChangesBaseRevision": 498,
                "profileChanges": [],
                "profileCommandRevision": 281,
                "serverTime": serverTime,
                "responseVersion": 1
            });
            break;
        default:
            res.status(400).json({
                success: false,
                reason: `Invalid \`profile\` of \`${searchParams.get("profile")}\``
            });
    }
}