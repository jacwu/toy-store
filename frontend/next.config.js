/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    emotion: true,
  },
}

module.exports = nextConfig
