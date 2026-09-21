import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/metadata/constants";
import type {
  MetadataConfig,
  OpenGraphMetadata,
  TwitterMetadata,
} from "@/lib/metadata/types";
import type { Metadata } from "next";
import type { Locale } from "next-intl";

const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
};

export function generatePageUrl(
  path: string,
  locale: Locale = routing.defaultLocale
): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(
    `/${locale}${cleanPath === "/" ? "/" : cleanPath}`,
    SITE_CONFIG.url
  ).toString();
}

export function generateAlternateLanguages(path: string) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = generatePageUrl(path, locale);
  }

  languages["x-default"] = generatePageUrl(path, routing.defaultLocale);

  return languages;
}

function generateRobotsConfig(noIndex?: boolean): Metadata["robots"] {
  return {
    follow: true,
    googleBot: {
      follow: true,
      index: !noIndex,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: !noIndex,
  };
}

function generateOpenGraphConfig(
  openGraph: OpenGraphMetadata,
  title: string,
  description: string,
  canonical: string,
  locale: Locale
) {
  return {
    description: openGraph.description || description,
    images: [
      {
        alt: openGraph.imageAlt || title,
        height: 630,
        type: "image/png",
        url: openGraph.image || SITE_CONFIG.ogImage,
        width: 1200,
      },
    ],
    locale: OPEN_GRAPH_LOCALES[locale],
    siteName: SITE_CONFIG.name,
    title: openGraph.title || title,
    type: openGraph.type || "website",
    url: canonical,
  };
}

function generateTwitterConfig(
  twitter: TwitterMetadata,
  title: string,
  description: string
) {
  return {
    card: twitter.card || "summary_large_image",
    creator: twitter.creator || SITE_CONFIG.twitterHandle,
    description: twitter.description || description,
    images: [twitter.image || SITE_CONFIG.ogImage],
    site: SITE_CONFIG.twitterHandle,
    title: twitter.title || title,
  };
}

export async function generateMetadata(
  config: MetadataConfig,
  locale: Locale,
  path = "/"
): Promise<Metadata> {
  const title = config.title || SITE_CONFIG.title;
  const description = config.description || SITE_CONFIG.description;
  const canonical = config.canonical ?? generatePageUrl(path, locale);

  const metadata: Metadata = {
    authors: SITE_CONFIG.authors,
    creator: SITE_CONFIG.creator,
    description,
    keywords: config.keywords || SITE_CONFIG.keywords,
    publisher: SITE_CONFIG.name,
    robots: generateRobotsConfig(config.noIndex),
    title,
  };

  metadata.alternates = {
    canonical,
    ...(config.alternateLanguages && {
      languages: config.alternateLanguages,
    }),
  };

  if (config.openGraph) {
    metadata.openGraph = generateOpenGraphConfig(
      config.openGraph,
      title,
      description,
      canonical,
      locale
    );
  }

  if (config.twitter) {
    metadata.twitter = generateTwitterConfig(
      config.twitter,
      title,
      description
    );
  }

  return await metadata;
}
