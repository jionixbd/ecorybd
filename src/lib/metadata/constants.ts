import { getBaseUrl } from "@/lib/get-base-url";
import { resolvePublicUrl } from "@/lib/resolve-public-url";
import type { Metadata } from "next";

export const SITE_CONFIG = {
  authors: [
    {
      name: "Ecory Team",
      url: getBaseUrl(),
    },
  ],
  creator: "@sizarcorpse",
  description:
    "A comprehensive platform for aspiring developers to learn, grow, and build their careers with cutting-edge tools and resources.",
  keywords: [],
  name: "Ecory",
  ogImage: `${getBaseUrl()}/api/open-graph`,
  social: {
    facebook: "https://www.facebook.com/ecorybd",
    instagram: "https://www.instagram.com/ecory_bd",
    youtube: "https://www.youtube.com/@ecorybd",
  },
  title: "Ecory – Stay Healthy With Nature",
  twitterHandle: "@sizarcorpse",
  url: getBaseUrl(),
};

export const DEFAULT_METADATA = {
  authors: SITE_CONFIG.authors,

  // manifest: "/site.webmanifest",
  // verification: {
  // 	google: process.env.GOOGLE_SITE_VERIFICATION,
  // 	yandex: process.env.YANDEX_VERIFICATION,
  // 	yahoo: process.env.YAHOO_VERIFICATION,
  // },

  category: "technology",
  classification: "Business",
  creator: SITE_CONFIG.creator,
  description: SITE_CONFIG.description,
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  //   NOTE: Use Next.js file-based metadata.
  icons: [
    {
      rel: "apple-touch-icon",
      url: resolvePublicUrl("/favicon/apple-touch-icon.png"),
    },
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: resolvePublicUrl("/favicon/favicon-32x32.png"),
    },
    {
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: resolvePublicUrl("/favicon/favicon-16x16.png"),
    },
    {
      rel: "icon",
      url: resolvePublicUrl("/favicon/favicon.ico"),
    },
  ],
  keywords: SITE_CONFIG.keywords,
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    description: SITE_CONFIG.description,
    images: [
      {
        alt: SITE_CONFIG.name,
        height: 630,
        type: "image/png",
        url: SITE_CONFIG.ogImage,
        width: 1200,
      },
    ],
    locale: "en_US",
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    type: "website",
    url: SITE_CONFIG.url,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": SITE_CONFIG.name,
    "application-name": SITE_CONFIG.name,
    "mobile-web-app-capable": "yes",
  },
  publisher: SITE_CONFIG.name,
  referrer: "origin-when-cross-origin",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  twitter: {
    card: "summary_large_image",
    creator: SITE_CONFIG.twitterHandle,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    site: SITE_CONFIG.twitterHandle,
    title: SITE_CONFIG.title,
  },
} satisfies Metadata;
