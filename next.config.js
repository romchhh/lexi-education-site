/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'img.youtube.com'],
  },
  async redirects() {
    return [
      {
        source: '/napryamy/angliiska',
        destination: '/napryamy/nimetska',
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig
