/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.nehros.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
