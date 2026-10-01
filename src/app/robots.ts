import { getBaseUrl } from "@/lib/get-base-url";
import type { MetadataRoute } from "next";

const disallowPaths = [
  "/api/*",
  "/_next/*",
  "/dashboard/*",
  "/app/*",
  "/studio/*",
  "/ingest/*",
  "/sign-in",
  "/sign-in/*",
  "/sign-up",
  "/sign-up/*",
  "/onboarding",
  "/onboarding/*",
  "/organization/*",
  "/workspace/*",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    host: baseUrl,
    rules: {
      allow: "/",
      disallow: disallowPaths,
      userAgent: "*",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
