const {
  createVanillaExtractPlugin
} = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@dynamic-labs/sdk-react'],
  images: {
    domains: ['gateway.pinata.cloud'],
  },
 
}

module.exports = withVanillaExtract(nextConfig)
