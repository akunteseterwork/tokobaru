const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tokobaru.alwaysdata.net',
        pathname: '/v1/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig;
