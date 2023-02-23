const {
  createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.pinata.cloud', 'api.kali.gg', 'cdn.jsdelivr.net'],
  },
}

module.exports = withVanillaExtract(withPWA(nextConfig))
