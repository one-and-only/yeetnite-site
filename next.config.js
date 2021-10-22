// TODO simplify redirects
    // i. no need to look for query params in the `source` if they’re already being passed in automatically
    // ii. make it as short as possible, while maintaining code readability
// TODO Standardize error handling
    // i. use `status(400).json(...error);` for bad requests/invalid data

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
            // Cloudstorage (System)
            {
                source: '/fortnite/api/cloudstorage/system/:storageHash',
                destination: '/api/fortnite/fortnite/api/cloudstorage/system?storageHash=:storageHash',
            },
            // Cloudstorage (System) without a "Storage Hash"
            {
                source: '/fortnite/api/cloudstorage/system',
                destination: '/api/fortnite/fortnite/api/cloudstorage/system',
            },
            // Friends
            {
                source: '/friends/api/public/friends/:accountId',
                destination: '/api/fortnite/friends/api/public/friends?accountId=:accountId',
            },
            // User Settings (probably NOT ClientSettings.Sav???)
            {
                source: '/friends/api/v1/:accountId/settings',
                destination: '/api/fortnite/friends/api/v1/settings?accountId=:accountId',
            },
            // Recent Players
            {
                source: '/friends/api/public/list/fortnite/:accountId/recentPlayers',
                destination: '/api/fortnite/friends/api/public/list/fortnite/recentPlayers?accountId=:accountId',
            },
            // Version Check
            {
                source: '/fortnite/api/v2/versioncheck/:OSVersion',
                destination: '/api/fortnite/fortnite/api/v2/versionCheck?OSVersion=:OSVersion',
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
                source: '/fortnite/api/game/v2/profile/:accountId/client/SetMtxPlatform:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/setMtxPlatform?accountId=:accountId',
            },
            // QueryProfile
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/QueryProfile:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/queryProfile?accountId=:accountId',
            },
            // ClientQuestLogin
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/ClientQuestLogin:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/clientQuestLogin?accountId=:accountId',
            },
            // Get or Set ClientSettings.Sav (but saved in the database)
            {
                source: '/fortnite/api/cloudstorage/user/:accountId/ClientSettings.Sav',
                destination: '/api/fortnite/fortnite/api/cloudstorage/user/clientSettings?accountId=:accountId',
            },
            // Cloudstorage for Fortnite user
            {
                source: '/fortnite/api/cloudstorage/user/:accountId',
                destination: '/api/fortnite/fortnite/api/cloudstorage/user?accountId=:accountId',
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
            }
        ];
    },
    reactStrictMode: true,
    poweredByHeader: false,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // don't resolve '...' module on the client
            // prevents this error on build: Error: Can't resolve '...'
            config.resolve.fallback = {
                net: false,
                tls: false,
                stream: false,
                timers: false,
                crypto: false,
                zlib: false,
                cardinal: false,
            }
        }

        return config;
    }
}
