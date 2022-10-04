// TODO Standardize error handling
// i. use `status(400).json(...error);` for bad requests/invalid data

// TODO Remove all req and res parameters that aren't used

module.exports = {
    async rewrites() {
        return [
            // Offers (Paid, such as VBucks)
            {
                source: '/catalog/api/shared/bulk/offers',
                destination: '/api/fortnite/catalog/api/shared/bulk/offers',
            },
            // Public Account Info
            {
                source: '/account/api/public/account',
                destination: '/api/fortnite/account/api/public/account',
            },
            // Catalog (Item Shop List)
            {
                source: '/fortnite/api/storefront/v2/catalog',
                destination: '/api/fortnite/fortnite/api/storefront/v2/catalog',
            },
            // "fortnite-game" Pages
            {
                source: '/content/api/pages/fortnite-game',
                destination: '/api/fortnite/content/api/pages/fortnite-game',
            },
            // Timeline
            {
                source: '/fortnite/api/calendar/v1/timeline',
                destination: '/api/fortnite/fortnite/api/calendar/v1/timeline',
            },
            // Keychain
            {
                source: '/fortnite/api/storefront/v2/keychain',
                destination: '/api/fortnite/fortnite/api/storefront/v2/keychain/',
            },
            // Enabled Features
            {
                source: '/fortnite/api/game/v2/enabled_features',
                destination: '/api/fortnite/fortnite/api/game/v2/enabled_features',
            },
            // Service Status
            {
                source: '/lightswitch/api/service/bulk/status',
                destination: '/api/fortnite/lightswitch/api/service/bulk/status',
            },
            // Datarouter
            {
                source: '/datarouter/api/v1/public/data',
                destination: '/api/fortnite/datarouter/api/v1/public/data',
            },
            // Waiting Room
            {
                source: '/waitingroom/api/waitingroom',
                destination: '/api/fortnite/waitingroom/api/waitingroom',
            },
            // OAuth Token
            {
                source: '/account/api/oauth/token',
                destination: '/api/fortnite/account/api/oauth/token',
            },
            // Possibly used for logout???
            {
                source: '/account/api/oauth/sessions/kill/:token',
                destination: '/api/fortnite/account/api/oauth/sessions/kill?killType=logout&token=:token',
            },
            // Kill OTHER TYPE oauth session
            {
                source: '/account/api/oauth/sessions/kill',
                destination: '/api/fortnite/account/api/oauth/sessions/kill',
            },
            // Cloudstorage (System) DefaultEngine.ini
            {
                source: '/fortnite/api/cloudstorage/system/DefaultEngine.ini',
                destination: '/FNConfigs/DefaultEngine.ini'
            },
            // Cloudstorage (System) DefaultGame.ini
            {
                source: '/fortnite/api/cloudstorage/system/DefaultGame.ini',
                destination: '/FNConfigs/DefaultGame.ini'
            },
            // Cloudstorage (System) DefaultRuntimeOptions.ini
            {
                source: '/fortnite/api/cloudstorage/system/DefaultRuntimeOptions.ini',
                destination: '/FNConfigs/DefaultRuntimeOptions.ini'
            },
            // Cloudstorage (User) Get ClientSettings.Sav File Attributes For Username
            {
                source: '/fortnite/api/cloudstorage/user/:accountId',
                destination: '/api/fortnite/fortnite/api/cloudstorage/user?username=:accountId&fileInfo=true'
            },
            // Cloudstorage (System)
            {
                source: '/fortnite/api/cloudstorage/system',
                destination: '/api/fortnite/fortnite/api/cloudstorage/system',
            },
            // Friends
            {
                source: '/friends/api/public/friends/:accountId',
                destination: '/api/fortnite/friends/api/public/friends?accountId=:accountId',
            },
            // User Settings
            {
                source: '/friends/api/v1/:accountId/settings',
                destination: '/api/fortnite/friends/api/v1/settings?accountId=:accountId',
            },
            // Recent Players
            {
                source: '/friends/api/public/list/fortnite/:accountId/recentPlayers',
                destination: '/api/fortnite/friends/api/public/list/fortnite/recentPlayers?accountId=:accountId',
            },
            // Version Check (New)
            {
                source: '/fortnite/api/v2/versioncheck/:version',
                destination: '/api/fortnite/fortnite/api/v2/versionCheck?version=:version',
            },
            // Version Check (Old)
            {
                source: '/fortnite/api/versioncheck',
                destination: '/api/fortnite/fortnite/api/v2/versionCheck'
            },
            // get a user's receipt
            {
                source: '/fortnite/api/receipts/v1/account/:accountId/receipts',
                destination: '/api/fortnite/fortnite/api/receipts/v1/account/receipts?accountId=:accountId',
            },
            // tryPlayOnPlatform
            {
                source: '/fortnite/api/game/v2/tryPlayOnPlatform/account/:slug*',
                destination: '/api/fortnite/fortnite/api/game/v2/tryPlayOnPlatform',
            },
            // setMtxPlatform
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/SetMtxPlatform',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/setMtxPlatform?accountId=:accountId',
            },
            // QueryProfile
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/QueryProfile',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/queryProfile?accountId=:accountId',
            },
            // ClientQuestLogin
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/ClientQuestLogin',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/ClientQuestLogin?accountId=:accountId',
            },
            // Get or Set ClientSettings.Sav (but saved in the database)
            {
                source: '/fortnite/api/cloudstorage/user/:accountId/ClientSettings.Sav',
                destination: `/api/fortnite/fortnite/api/cloudstorage/user?accountId=:accountId`,
            },
            // User's Block List
            {
                source: '/friends/api/public/blocklist/:accountId',
                destination: '/api/fortnite/friends/api/public/blocklist?accountId=:accountId',
            },
            // External Auths for user (Ex: PSN, Steam, etc)
            // currently Yeetnite Services doesn't support external auths
            {
                source: '/account/api/public/account/:accountId/externalAuths',
                destination: '/api/fortnite/account/api/public/externalAuths?accountId=:accountId',
            },
            // Full acount info
            {
                source: '/account/api/public/account/:accountId',
                destination: '/api/fortnite/account/api/public/account?fullAccountInfo=true&accountId=:accountId',
            },
            // Display Name
            {
                source: '/account/api/public/account/displayName/:accountId',
                destination: '/api/fortnite/account/api/public/account?fullAccountInfo=true&accountId=:accountId',
            },
            // Friends (Add/Accept/Remove Friends)
            {
                source: '/friends/api/public/friends/:accountId1/:accountId2',
                destination: '/api/fortnite/account/api/public/friends?accountId1=:accountId1&accountId2=:accountId2',
            },
            // Block User
            {
                source: '/friends/api/public/blocklist/:accountId/:blocking',
                destination: '/api/fortnite/friends/api/public/blocklist?accountId=:accountId&blocking=:blocking'
            },
            // OAuth Verify
            {
                source: '/account/api/oauth/verify',
                destination: '/api/fortnite/account/api/oauth/verify',
            },
            // Equip Battle Royale Customization
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/EquipBattleRoyaleCustomization',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/equipBattleRoyaleCustomization?accountId=:accountId',
            },
            // Change Banner Icon and Color
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/SetBattleRoyaleBanner',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/setBattleRoyaleBanner?accountId=:accountId',
            },
            // Single Sign On Domains (SSO)
            {
                source: '/account/api/epicdomains/ssodomains',
                destination: '/api/fortnite/account/api/epicdomains/ssodomains',
            },
            // UELA Agreement
            {
                source: '/eulatracking/api/shared/agreements/fn',
                destination: '/api/fortnite/eulatracking/api/shared/agreements/fn',
            },
            // World Info
            {
                source: '/fortnite/api/game/v2/world/info',
                destination: '/api/fortnite/fortnite/api/game/v2/world/info',
            },
            // Find Player (Matchmaking)
            {
                source: '/fortnite/api/matchmaking/session/findPlayer/:accountId',
                destination: '/api/fortnite/fortnite/api/matchmaking/session/findPlayer?accountId=:accountId',
            },
            // GetMcpTimeForLogin
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/GetMcpTimeForLogin',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/getMcpTimeForLogin?accountId=:accountId',
            },
            // IncrementNamedStatCounter
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/IncrementNamedCounterStat',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/incrementNamedCounterStat?accountId=Revvz',
            },
            // Epic Friend Codes
            {
                source: '/fortnite/api/game/v2/friendcodes/:accountId/epic',
                destination: '/api/fortnite/fortnite/api/game/v2/friendcodes/epic?accountId=:accountId',
            },
            // STW Refresh Expeditions
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/RefreshExpeditions',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/refreshExpeditions'
            },
            // STW Mark New Quest Notification As Sent
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/MarkNewQuestNotificationSent',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/markNewQuestNotificationSent?accountId=:accountId'
            },
            // STW Claim Login Reward
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/ClaimLoginReward',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/claimLoginReward?accountId=:accountId'
            },
            // Account Privacy
            {
                source: '/fortnite/api/game/v2/privacy/account/:accountId',
                destination: '/api/fortnite/fortnite/api/game/v2/privacy/account?accountId=:accountId'
            },
            // MP Matchmaking Ticket
            {
                source: '/fortnite/api/game/v2/matchmakingservice/ticket/player/:accountId',
                destination: '/api/fortnite/fortnite/api/game/v2/matchmakingservice/ticket/player?accountId=:accountId'
            }
        ];
    },
    reactStrictMode: true,
    poweredByHeader: false,
}
