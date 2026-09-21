import { getBaseUrl } from "@/lib/get-base-url";

const API_PREFIX = "/api/v1";
const TRAIL_SLASH = /\/$/;

type SearchParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export function resolveApiUrl(path: string, params?: SearchParams): string {
  const baseUrl = getBaseUrl().replace(TRAIL_SLASH, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const apiPath = cleanPath.startsWith("/api")
    ? cleanPath
    : `${API_PREFIX}${cleanPath}`;

  const url = new URL(apiPath, baseUrl);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}
