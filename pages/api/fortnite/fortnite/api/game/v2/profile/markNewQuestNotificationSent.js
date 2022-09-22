import campaign from './profiles/campaign.json';

export default function markNewQuestNotificationSent(req, res) {
    campaign.serverTime = new Date().toISOString();
    campaign.profileRevision = parseInt(req.query.rvn);
    campaign.profileChangesBaseRevision = parseInt(req.query.rvn);
    campaign.profileCommandRevision = parseInt(req.query.rvn) - 10;
    res.json(campaign);
}