import { env } from "@/lib/env";

export function isGtmEnabled(): boolean {
  return (
    // process.env.NODE_ENV === "production" &&
    env.NEXT_PUBLIC_GTM_ENABLED && Boolean(env.NEXT_PUBLIC_GTM_ID)
  );
}
