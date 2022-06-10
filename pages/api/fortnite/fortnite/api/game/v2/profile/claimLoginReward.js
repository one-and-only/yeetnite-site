export default function claimLoginReward(req, res) {
    const serverTime = new Date().toISOString();
    res.json({
        "profileRevision": parseInt(req.query.rvn) + 1,
        "profileId": "campaign",
        "profileChangesBaseRevision": parseInt(req.query.rvn),
        "profileChanges": [
            {
                "changeType": "statModified",
                "name": "daily_rewards",
                "value": {
                    "nextDefaultReward": 70,
                    "totalDaysLoggedIn": 70,

                    // not sure if I should store this in the database or not
                    "lastClaimDate": serverTime,
                    "additionalSchedules": {
                        "founderspackdailyrewardtoken": {
                            "rewardsClaimed": 70,
                            "claimedToday": true
                        }
                    }
                }
            }
        ],
        "profileCommandRevision": parseInt(req.query.rvn) + 1 - 10,
        "serverTime": serverTime,
        "responseVersion": 1
    });
}