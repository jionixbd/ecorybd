import { SITE_CONFIG } from "@/lib/metadata/constants";

type StructuredData = Record<string, unknown>;

export function generateStructuredData(type: string, data: StructuredData) {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    }),
  };
}

export function generateOrganizationStructuredData() {
  return generateStructuredData("Organization", {
    description: SITE_CONFIG.description,
    logo: `${SITE_CONFIG.url}/logo.png`,
    name: SITE_CONFIG.name,
    sameAs: Object.values(SITE_CONFIG.social),
    url: SITE_CONFIG.url,
  });
}

export function generateWebsiteStructuredData() {
  return generateStructuredData("WebSite", {
    description: SITE_CONFIG.description,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
  });
}

export interface ArticleStructuredData {
  author: {
    name: string;
    url?: string;
  };
  dateModified?: string;
  datePublished: string;
  description: string;
  image?: string | string[];
  title: string;
  url: string;
}

export function generateArticleStructuredData(article: ArticleStructuredData) {
  return generateStructuredData("Article", {
    author: {
      "@type": "Person",
      name: article.author.name,
      ...(article.author.url && {
        url: article.author.url,
      }),
    },
    dateModified: article.dateModified ?? article.datePublished,
    datePublished: article.datePublished,
    description: article.description,
    headline: article.title,
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    url: article.url,
    ...(article.image && {
      image: article.image,
    }),
  });
}
