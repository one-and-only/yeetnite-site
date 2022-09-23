import campaign from './profiles/campaign.json';
import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function clientQuestLogin(req) {
    const { searchParams } = new URL(req.url);

    if (searchParams.get("accountId") && searchParams.get("profileId") && searchParams.get("rvn")) {
        switch (searchParams.get("profileId")) {
            case 'athena':
                return edgeResponse({
                    "accountId": searchParams.get("accountId"),
                    "displayName": searchParams.get("accountId")
                });
            case 'campaign':
                campaign.serverTime = new Date().toISOString();
                campaign.profileRevision = parseInt(searchParams.get("rvn"));
                campaign.profileChangesBaseRevision = parseInt(searchParams.get("rvn"));
                campaign.profileCommandRevision = parseInt(searchParams.get("rvn")) - 10;
                return edgeResponse(campaign);
            default:
                return edgeResponse({
                    success: false,
                    reason: `invalid \`profileId\` of \`${searchParams.get("profileId")}\``
                }, 400);
        }
    } else {
        return edgeResponse({
            status: "error",
            reason: "We have received invalid data and are unable to process your request."
        }, 400);
    }
}