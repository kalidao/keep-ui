const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.pinata.cloud', 'api.kali.gg', 'cdn.jsdelivr.net', 'content.wrappr.wtf', 'pbs.twimg.com'],
  },
}

module.exports = nextConfig
