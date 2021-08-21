module.exports = {
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
