/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use standalone output for Docker builds
  ...(process.env.NODE_ENV === 'production' && process.env.DOCKER_BUILD === 'true' && {
    output: 'standalone',
  }),
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/api/v1/image/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
};

module.exports = nextConfig;
