/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost:3333',
            port: '',
            pathname: '/src/public/*.jpeg',
          },
        ],
      },
};

export default nextConfig;
