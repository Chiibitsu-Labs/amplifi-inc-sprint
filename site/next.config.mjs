/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // /onboard is proxied through capchecker's own domain via a rewrite (see
  // amplifi-capchecker/next.config.mjs) so the URL reads amplifi.chiibitsu.com/onboard.
  // Without this, the HTML would still render, but its _next/static chunk
  // references are root-relative and would resolve against capchecker's
  // origin instead of this app's — breaking all JS/CSS on the proxied page.
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://amplifi-inc-sprint.vercel.app"
      : undefined,
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
