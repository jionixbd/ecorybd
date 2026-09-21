import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { intlMiddleware } from "./i18n/middleware";

export default clerkMiddleware(
  async (_auth, req: NextRequest) => {
    if (
      req.nextUrl.pathname.startsWith("/api") ||
      req.nextUrl.pathname.startsWith("/trpc") ||
      req.nextUrl.pathname.startsWith("/.well-known") ||
      req.nextUrl.pathname.startsWith("/ingest")
    ) {
      return;
    }
    return await intlMiddleware(req);
  },
  {
    organizationSyncOptions: {
      organizationPatterns: [
        "/:locale/workspace/:slug",
        "/:locale/workspace/:slug/(.*)",
      ],
    },
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
};
