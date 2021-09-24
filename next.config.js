module.exports = {
    async redirects() {
        return [
            // ClientQuestLogin
            {
                source: '/api/fortnite/fortnite/api/game/v2/profile/:accountId/client/ClientQuestLogin:params*',
                destination: '/api/fortnite/fortnite/api/game/v2/profile/ClientQuestLogin?accountId=:accountId',
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
