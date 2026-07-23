/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      {
        source: "/capchecker",
        destination: "https://amplifi-capchecker.vercel.app",
        permanent: false,
      },
      {
        source: "/capchecker/:path*",
        destination: "https://amplifi-capchecker.vercel.app/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
