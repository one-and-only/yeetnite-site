import edgeResponse from '@lib/edgeResponse';

export const config = {
    runtime: 'experimental-edge',
}

export default function claimLoginReward(req) {
    const { searchParams } = new URL(req.url);
    const serverTime = new Date().toISOString();

    return edgeResponse({
        "profileRevision": parseInt(searchParams.get("rvn")) + 1,
        "profileId": "campaign",
        "profileChangesBaseRevision": parseInt(searchParams.get("rvn")),
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
        "profileCommandRevision": parseInt(searchParams.get("rvn")) - 9,
        "serverTime": serverTime,
        "responseVersion": 1
    });
}