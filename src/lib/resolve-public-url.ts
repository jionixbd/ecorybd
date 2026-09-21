import { getBaseUrl } from "@/lib/get-base-url";

const NO_TRAILING_SLASH = /\/$/;
const NO_LEADING_PUBLIC = /^\/?public\//;

export function resolvePublicUrl(path: string): string {
  const baseUrl = getBaseUrl().replace(NO_TRAILING_SLASH, "");

  const cleanPath = path.replace(NO_LEADING_PUBLIC, "/");

  const normalizedPath = cleanPath.startsWith("/")
    ? cleanPath
    : `/${cleanPath}`;

  return `${baseUrl}${normalizedPath}`;
}
