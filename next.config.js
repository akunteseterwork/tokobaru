/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'tokobaru.alwaysdata.net',
            pathname: '/uploads/**',
          },
        ],
      },
}

module.exports = nextConfig
