module.exports = {
    async redirects() {
        return [
            // Version Check
            {
                source: '/api/fortnite/fortnite/api/v2/versioncheck/Windows:slug*',
                destination: '/api/fortnite/fortnite/api/v2/versionCheck:slug*',
                permanent: true,
            },
            // get a user's receipt
            {
                source: '/api/fortnite/fortnite/api/receipts/v1/account/:accountId/receipts',
                destination: '/api/fortnite/fortnite/api/receipts/v1/account/receipts?accountId=:accountId',
                permanent: true,
            },
            // tryPlayOnPlatform
            {
                source: '/api/fortnite/fortnite/api/game/v2/tryPlayOnPlatform/account/:slug*',
                destination: '/api/fortnite/fortnite/api/game/v2/tryPlayOnPlatform',
                permanent: true,
            },
            // setMtxPlatform
            {
                source: '/api/fortnite/fortnite/api/game/v2/profile/:accountId/client/SetMtxPlatform:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/setMtxPlatform?accountId=:accountId',
                permanent: true,
            },
            // QueryProfile
            {
                source: '/api/fortnite/fortnite/api/game/v2/profile/:accountId/client/QueryProfile:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/queryProfile?accountId=:accountId',
                permanent: true,
            },
            // ClientQuestLogin
            {
                source: '/api/fortnite/fortnite/api/game/v2/profile/:accountId/client/ClientQuestLogin:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/clientQuestLogin?accountId=:accountId',
                permanent: true,
            },
            // Get or Set ClientSettings.Sav (but saved in the database)
            {
                source: '/api/fortnite/fortnite/api/cloudstorage/user/:accountId/ClientSettings.Sav',
                destination: '/api/fortnite/fortnite/api/cloudstorage/user/clientSettings?accountId=:accountId',
                permanent: true,
            },
            // Cloudstorage for Fortnite user
            {
                source: '/api/fortnite/fortnite/api/cloudstorage/user/:accountId',
                destination: '/api/fortnite/fortnite/api/cloudstorage/user?accountId=:accountId',
                permanent: true,
            },
            // User's Block List
            {
                source: '/api/fortnite/friends/api/public/blocklist/:accountId',
                destination: '/api/fortnite/friends/api/public/blocklist?accountId=:accountId',
                permanent: true,
            },
            // External Auths for user (Ex: PSN, Steam, etc)
            // currently Yeetnite Services doesn't support external auths
            {
                source: '/api/fortnite/account/api/public/account/:accountId/externalAuths',
                destination: '/api/fortnite/account/api/public/externalAuths?accountId=:accountId',
                permanent: true,
            },
            // Full acount info
            {
                source: '/api/fortnite/account/api/public/account/:accountId',
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
