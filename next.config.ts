// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Turbopack (DEV) – vervangt deprecated experimental.turbo
  turbopack: {
    rules: {
      "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" }, // SVG's als React component
    },
  },

  // ✅ Webpack (BUILD of als je nog met webpack runt)
  webpack(config) {
    const rules = config.module.rules || [];
    const assetRule = rules.find((r: any) => r?.test?.test?.(".svg"));
    if (assetRule) assetRule.exclude = /\.svg$/i;
    rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    config.module.rules = rules;
    return config;
  },

  // URL-shape: /taxi-rotterdam → render /taxi/rotterdam
  async rewrites() {
    return [{ source: "/taxi-:slug", destination: "/taxi/:slug" }];
  },

  // Zorg dat /taxi/:slug netjes doorverwijst naar publieke vorm
  async redirects() {
    return [
      { source: "/taxi/:slug", destination: "/taxi-:slug", permanent: true },
    ];
  },
};

export default nextConfig;
