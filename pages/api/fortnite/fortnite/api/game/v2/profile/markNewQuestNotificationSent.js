import campaign from './profiles/campaign.json';
import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function markNewQuestNotificationSent(req) {
    const { searchParams } = new URL(req.url);

    campaign.serverTime = new Date().toISOString();
    campaign.profileRevision = parseInt(searchParams.get("rvn"));
    campaign.profileChangesBaseRevision = parseInt(searchParams.get("rvn"));
    campaign.profileCommandRevision = parseInt(searchParams.get("rvn")) - 10;
    return edgeResponse(campaign);
}