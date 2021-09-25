module.exports = {
    async redirects() {
        return [
            // Friends
            {
                source: '/friends/api/public/friends/:accountId',
                destination: '/api/fortnite/friends/api/public/friends?accountId=:accountId',
                permanent: true,
            },
            // User Settings (probably NOT ClientSettings.Sav???)
            {
                source: '/friends/api/v1/:accountId/settings',
                destination: '/api/fortnite/friends/api/v1/settings?accountId=:accountId',
                permanent: true,
            },
            // Recent Players
            {
                source: '/friends/api/public/list/fortnite/:accountId/recentPlayers',
                destination: '/api/fortnite/friends/api/public/list/fortnite/recentPlayers?accountId=:accountId',
                permanent: true,
            },
            // Version Check
            {
                source: '/fortnite/api/v2/versioncheck/Windows:slug*',
                destination: '/api/fortnite/fortnite/api/v2/versionCheck:slug*',
                permanent: true,
            },
            // get a user's receipt
            {
                source: '/fortnite/api/receipts/v1/account/:accountId/receipts',
                destination: '/api/fortnite/fortnite/api/receipts/v1/account/receipts?accountId=:accountId',
                permanent: true,
            },
            // tryPlayOnPlatform
            {
                source: '/fortnite/api/game/v2/tryPlayOnPlatform/account/:slug*',
                destination: '/api/fortnite/fortnite/api/game/v2/tryPlayOnPlatform',
                permanent: true,
            },
            // setMtxPlatform
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/SetMtxPlatform:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/setMtxPlatform?accountId=:accountId',
                permanent: true,
            },
            // QueryProfile
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/QueryProfile:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/queryProfile?accountId=:accountId',
                permanent: true,
            },
            // ClientQuestLogin
            {
                source: '/fortnite/api/game/v2/profile/:accountId/client/ClientQuestLogin:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/clientQuestLogin?accountId=:accountId',
                permanent: true,
            },
            // Get or Set ClientSettings.Sav (but saved in the database)
            {
                source: '/fortnite/api/cloudstorage/user/:accountId/ClientSettings.Sav',
                destination: '/api/fortnite/fortnite/api/cloudstorage/user/clientSettings?accountId=:accountId',
                permanent: true,
            },
            // Cloudstorage for Fortnite user
            {
                source: '/fortnite/api/cloudstorage/user/:accountId',
                destination: '/api/fortnite/fortnite/api/cloudstorage/user?accountId=:accountId',
                permanent: true,
            },
            // User's Block List
            {
                source: '/friends/api/public/blocklist/:accountId',
                destination: '/api/fortnite/friends/api/public/blocklist?accountId=:accountId',
                permanent: true,
            },
            // External Auths for user (Ex: PSN, Steam, etc)
            // currently Yeetnite Services doesn't support external auths
            {
                source: '/account/api/public/account/:accountId/externalAuths',
                destination: '/api/fortnite/account/api/public/externalAuths?accountId=:accountId',
                permanent: true,
            },
            // Full acount info
            {
                source: '/account/api/public/account/:accountId',
                destination: '/api/fortnite/account/api/public/account?fullAccountInfo=true&accountId=:accountId',
                permanent: true,
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
