// import type { NextConfig } from "next";


// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'productive-success-86db1bbd31.media.strapiapp.com',
//         // port: '1337',
//         // pathname: '/**', 
//       },
//     ],
//   },
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.strapiapp.com',
      },
      {
        protocol: "http",
        hostname: "**.strapiapp.com",
      }
    ],
  },
};

module.exports = nextConfig;


export default nextConfig;
