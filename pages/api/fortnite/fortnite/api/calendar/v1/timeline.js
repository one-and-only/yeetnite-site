export default function timeline(req, res) {
    res.json(
        {
            "channels": {
                "client-matchmaking": {
                    "states": [
                        {
                            "validFrom": "2020-01-01T20:28:47.830Z",
                            "activeEvents": [],
                            "state": {
                                "region": {
                                    "OCE": {
                                        "eventFlagsForcedOn": [
                                            "Playlist_DefaultDuo"
                                        ]
                                    },
                                    "CN": {
                                        "eventFlagsForcedOn": [
                                            "Playlist_DefaultDuo"
                                        ]
                                    },
                                    "NAE": {
                                        "eventFlagsForcedOn": [
                                            "Playlist_DefaultDuo"
                                        ]
                                    },
                                    "NAW": {
                                        "eventFlagsForcedOn": [
                                            "Playlist_DefaultDuo"
                                        ]
                                    },
                                    "EU": {
                                        "eventFlagsForcedOn": [
                                            "Playlist_DefaultDuo"
                                        ]
                                    },
                                    "BR": {
                                        "eventFlagsForcedOn": [
                                            "Playlist_DefaultDuo"
                                        ]
                                    },
                                    "ASIA": {
                                        "eventFlagsForcedOn": [
                                            "Playlist_DefaultDuo"
                                        ]
                                    },
                                    "NA": {
                                        "eventFlagsForcedOn": [
                                            "Playlist_DefaultDuo"
                                        ]
                                    }
                                }
                            }
                        }
                    ],
                    "cacheExpire": "9999-01-01T22:28:47.830Z"
                },
                "client-events": {
                    "states": [
                        {
                            "validFrom": "2020-01-01T20:28:47.830Z",
                            "activeEvents": [
                                {
                                    "eventType": "EventFlag.Season6",
                                    "activeUntil": "9999-01-01T00:00:00.000Z",
                                    "activeSince": "2020-01-01T00:00:00.000Z"
                                },
                                {
                                    "eventType": "EventFlag.LobbySeason6",
                                    "activeUntil": "9999-01-01T14:00:00.000Z",
                                    "activeSince": "2020-01-01T13:00:00.000Z"
                                }
                            ],
                            "state": {
                                "activeStorefronts": [],
                                "eventNamedWeights": {},
                                "seasonNumber": 6,
                                "seasonTemplateId": "AthenaSeason:athenaseason6",
                                "matchXpBonusPoints": 0,
                                "seasonBegin": "2020-01-01T13:00:00Z",
                                "seasonEnd": "9999-01-01T14:00:00Z",
                                "seasonDisplayedEnd": "9999-01-01T07:30:00Z",
                                "weeklyStoreEnd": "9999-01-01T00:00:00Z",
                                "stwEventStoreEnd": "9999-01-01T00:00:00.000Z",
                                "stwWeeklyStoreEnd": "9999-01-01T00:00:00.000Z",
                                "dailyStoreEnd": "9999-01-01T00:00:00Z"
                            }
                        }
                    ],
                    "cacheExpire": "9999-01-01T22:28:47.830Z"
                }
            },
            "eventsTimeOffsetHrs": 0,
            "cacheIntervalMins": 10,
            // TODO change "currentTime" to current server time instead of hardcoded value
            "currentTime": "2021-01-03T16:22:20.000Z"
        }
    );
}