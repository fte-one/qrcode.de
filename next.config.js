/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Statischer Export nach ./out — wird von Cloudflare Workers (Static Assets) ausgeliefert
  output: 'export',
  images: { unoptimized: true },
}

module.exports = nextConfig
