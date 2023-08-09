/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_ENDPOINT: 'https://active-growth-4a80177b9b.strapiapp.com/graphql',
  },
}

module.exports = nextConfig
