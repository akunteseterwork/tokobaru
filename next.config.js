/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tokobaru.alwaysdata.net/v1',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
