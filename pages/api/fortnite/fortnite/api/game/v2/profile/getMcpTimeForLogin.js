import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function getMcpTimeForLogin(req) {
    const serverTime = new Date().toISOString();
    const { searchParams } = new URL(req.url);

    switch (searchParams.get("profileId")) {
        case 'profile0':
            return edgeResponse({
                "profileRevision": searchParams.get("rvn"),
                "profileId": "profile0",
                "profileChangesBaseRevision": searchParams.get("rvn"),
                "profileChanges": [],
                "profileCommandRevision": 0,
                "serverTime": serverTime,
                "responseVersion": 1
            });
        default:
            return edgeResponse({
                success: false,
                reason: `Invalid \`profileId\` of \`${searchParams.get("profileId")}\``,
            }, 400);
    }
}