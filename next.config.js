/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: false },
  async rewrites() {
    return [
      // optional rewrites if needed
    ];
  }
}
module.exports = nextConfig
