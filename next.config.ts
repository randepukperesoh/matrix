import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'productive-success-86db1bbd31.media.strapiapp.com',
        // port: '1337',
        // pathname: '/**', 
      },
    ],
  },
};



export default nextConfig;
