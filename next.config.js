/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_ENDPOINT: 'https://teste-ferias-wm-api-9bdf56522376.herokuapp.com/graphql',
  },
}

module.exports = nextConfig
