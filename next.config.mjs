/** @type {import('next').NextConfig} */

// Content-Security-Policy is intentionally permissive only where this site actually
// needs it. Fonts (Fraunces/Inter/IBM Plex Mono) are loaded via next/font/google, which
// self-hosts them at build time — no runtime request to Google Fonts, so font-src stays
// 'self'. script-src/connect-src include Google Tag Manager/Analytics hosts only for
// when NEXT_PUBLIC_GA_MEASUREMENT_ID is actually set (components/Analytics.tsx) —
// unused and harmless otherwise.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' data: blob:;
  connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
