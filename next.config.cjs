/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wciqlbbrxhcmajzvlbwe.supabase.co',
        port: '',
        pathname: '/storage/v1/**'
      }
    ]
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
