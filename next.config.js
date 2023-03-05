const {
  createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();


const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.pinata.cloud', 'api.kali.gg', 'cdn.jsdelivr.net'],
  },
}

module.exports = withVanillaExtract(nextConfig)
