import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Keep Cloudflare's native `cloudflare:` runtime modules out of the Node build.
  webpack: (config) => {
    config.externals = config.externals ?? [];
    if (Array.isArray(config.externals)) {
      config.externals.push(({ request }: { request?: string }, cb: (e?: unknown, r?: string) => void) => {
        if (request?.startsWith("cloudflare:")) {
          return cb(null, `commonjs ${request}`);
        }
        cb();
      });
    }
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/cover/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/cover",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

// Cloudflare dev-friendly binding initialization. Safe to import at build time.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
