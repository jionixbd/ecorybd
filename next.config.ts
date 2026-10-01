import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs/config";
import withVercelToolbar from "@vercel/toolbar/plugins/next";
import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";
import "./src/lib/env";

const withNextIntlConfig = withNextIntl("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.10", "delicate-stallion-prime.ngrok-free.app"],
  cacheComponents: true,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "img.clerk.com",
      },
      {
        hostname: "lxiscnt9tg.ufs.sh",
      },
      {
        hostname: "sfpe34umxg.ufs.sh",
      },
    ],
  },
  logging: {
    browserToTerminal: true,
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
  reactCompiler: true,

  async rewrites() {
    return [
      {
        destination: "https://us-assets.i.posthog.com/static/:path*",
        source: "/ingest/static/:path*",
      },
      {
        destination: `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/:path*`,
        source: "/ingest/:path*",
      },
      {
        destination: `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/decide`,
        source: "/ingest/decide",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

const withVercelToolbarConfig = withVercelToolbar()(nextConfig);

const sentryWebpackPluginOption = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  disableLogger: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  sourcemaps: {
    assets: ["./src/**"],
    deleteSourcemapsAfterUpload: true,
    ignore: [
      "node_modules",
      "webpack.config.js",
      ".next/cache",
      ".git",
      ".vercel",
      "public",
      "coverage",
      "*.config.js",
      "*.config.ts",
      "**/*.test.*",
      "**/*.spec.*",
    ],
  },
  tunnelRoute: "/api/sentry/monitoring",
  webpack: {
    automaticVercelMonitors: false,
  },
  widenClientFileUpload: true,
};

const withSentryConfigWrapper = withSentryConfig(
  withNextIntlConfig(withVercelToolbarConfig),
  sentryWebpackPluginOption
);

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzerConfig(withSentryConfigWrapper);
