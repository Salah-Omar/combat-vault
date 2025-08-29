/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ['*'] }
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.cdn.shopify.com' },
      { protocol: 'https', hostname: '**.myshopify.com' }
    ]
  }
}
module.exports = nextConfig
