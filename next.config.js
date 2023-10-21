/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/WebGameCapture',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
