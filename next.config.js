/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd
  },
  eslint: {
    dirs: ['src']
  },
  images: {
    domains: ['i.scdn.co', 'seed-mix-image.spotifycdn.com'],
    formats: ['image/avif', 'image/webp']
  },
  reactStrictMode: true
})
