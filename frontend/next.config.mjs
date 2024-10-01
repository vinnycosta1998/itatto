/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3333",
        pathname: "/public/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/vinnycosta1998.png",
      },
    ],
  },
};

export default nextConfig;
