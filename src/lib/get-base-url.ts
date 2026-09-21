export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_APP_URL
      : `https://${process.env.NEXT_PUBLIC_APP_URL}`;
  }

  if (process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL) {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;
    return `https://${url}`;
  }

  return `http://localhost:${process.env.PORT || 3000}`;
}
