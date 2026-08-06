/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // /onboard is proxied through capchecker's own domain via a rewrite (see
  // amplifi-capchecker/next.config.mjs) so the URL reads amplifi.chiibitsu.com/onboard.
  // Without this, the HTML would still render, but its _next/static chunk
  // references are root-relative and would resolve against capchecker's
  // origin instead of this app's — breaking all JS/CSS on the proxied page.
  // Gated on VERCEL_ENV, not NODE_ENV: `next build` sets NODE_ENV=production for
  // previews too, so a NODE_ENV check would point every preview's own asset
  // requests at the production URL instead of that preview's own build (Codex
  // review, PR #9) -- VERCEL_ENV is the one that's actually "production" only
  // on the production deployment, and is unset (falsy) outside Vercel too.
  assetPrefix:
    process.env.VERCEL_ENV === "production"
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
  async headers() {
    return [
      {
        // Root-relative url()s inside a stylesheet resolve against the
        // stylesheet's own origin, not the document's -- so once assetPrefix
        // makes /onboard's CSS load from this origin even when the page is
        // proxied through capchecker, its @font-face url('/fonts/...')
        // requests also go directly to this origin, cross-origin from the
        // capchecker document. Browsers fetch cross-origin fonts in CORS
        // mode, so without this header they fail closed -- silently, no
        // error beyond a CORS rejection in the Network tab (Codex review, PR #9).
        source: "/fonts/:path*",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};

export default nextConfig;
