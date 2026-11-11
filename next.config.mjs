/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.DOCKER_BUILD ? 'standalone' : undefined,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'starehegirlscentre.sc.ke',
      },
    ],
  },
};

export default nextConfig;
