/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/user/:path*',
        destination: 'http://localhost:5000/user/:path*',
      },
    ];
  },
};

export default nextConfig;
