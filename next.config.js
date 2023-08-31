const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tokobaru.alwaysdata.net',
        pathname: '/v1/uploads/**',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig;
