import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "websitelaunches.com",
      },
    ],
  },
};

export default nextConfig;
