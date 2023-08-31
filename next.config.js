const nextConfig = {
  //output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig;
