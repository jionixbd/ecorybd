import { clerkMiddleware } from "@clerk/nextjs/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { intlMiddleware } from "./i18n/middleware";
import { routing } from "./i18n/routing";

// const clerkHandler = clerkMiddleware(
//   async (_auth, req: NextRequest) => intlMiddleware(req),
//   {
//     organizationSyncOptions: {
//       organizationPatterns: [
//         "/:locale/workspace/:slug",
//         "/:locale/workspace/:slug/(.*)",
//       ],
//     },
//   }
// );

const clerkHandler = clerkMiddleware(
  async (_auth, req: NextRequest) => {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return;
    }

    return await intlMiddleware(req);
  },
  {
    organizationSyncOptions: {
      organizationPatterns: [
        "/workspace/:slug",
        "/workspace/:slug/(.*)",
        "/:locale/workspace/:slug",
        "/:locale/workspace/:slug/(.*)",
      ],
    },
  }
);

const PUBLIC_SEGMENTS = new Set([
  "pricing",
  "about",
  "blog",
  "docs",
  "thank-you",
]);

function isPublicPath(pathname: string): boolean {
  const [firstSegment, ...remainingSegments] = pathname
    .split("/")
    .filter(Boolean);

  if (firstSegment === undefined) {
    return true;
  }

  const isLocale = routing.locales.some((locale) => locale === firstSegment);

  if (isLocale) {
    // biome-ignore lint/style/useDestructuring:ok
    const pageSegment = remainingSegments[0];
    return pageSegment === undefined || PUBLIC_SEGMENTS.has(pageSegment);
  }

  return remainingSegments.length === 0 && PUBLIC_SEGMENTS.has(firstSegment);
}

export default function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  const isUploadthingPath =
    pathname === "/api/uploadthing" || pathname.startsWith("/api/uploadthing/");

  if (
    (!isUploadthingPath && pathname.startsWith("/api")) ||
    pathname.startsWith("/trpc") ||
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/ingest")
  ) {
    return;
  }

  if (isPublicPath(pathname)) {
    return intlMiddleware(req);
  }

  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};
