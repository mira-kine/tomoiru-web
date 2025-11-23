/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images are served from /public directory (local static files)
  // No remote image patterns needed until backend serves images

  // TODO: Add backend image hostname when image serving is implemented
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'localhost',
  //       port: '8000',
  //       pathname: '/api/v1/images/**'
  //     }
  //   ]
  // },
};

module.exports = nextConfig;
