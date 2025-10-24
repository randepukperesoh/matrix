import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Укажите порт вашего NEXT_PUBLIC_STRAPI сервера
        pathname: '/uploads/**', // Путь к папке uploads, где хранятся изображения
      },
    ],
  },
};



export default nextConfig;
