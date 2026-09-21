import { env } from "@/lib/env";

export const resendEnabled =
  Boolean(env.RESEND_API_KEY) && env.NEXT_PUBLIC_RESEND_ENABLED;
