import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Укажите порт вашего Strapi сервера
        pathname: '/uploads/**', // Путь к папке uploads, где хранятся изображения
      },
    ],
  },
};



export default nextConfig;
