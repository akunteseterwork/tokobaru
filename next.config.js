/** @type {import('next').NextConfig} */
const nextConfig = {
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
