export interface BaseMetadata {
  canonical?: string;
  description?: string;
  keywords?: string[];
  locale?: string;
  noIndex?: boolean;
  title?: string;
}

export interface OpenGraphMetadata {
  description?: string;
  image?: string;
  imageAlt?: string;
  locale?: string;
  siteName?: string;
  title?: string;
  type?: "website" | "article" | "profile";
  url?: string;
}

export interface TwitterMetadata {
  card?: "summary" | "summary_large_image" | "app" | "player";
  creator?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  site?: string;
  title?: string;
}

export interface MetadataConfig extends BaseMetadata {
  alternateLanguages?: Record<string, string>;
  openGraph?: OpenGraphMetadata | false;
  structuredData?: Record<string, unknown>;
  twitter?: TwitterMetadata | false;
}
