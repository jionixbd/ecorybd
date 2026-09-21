import { env } from "@/lib/env";
import { normalizeError } from "@/lib/error";
import { resend } from "@/lib/resend/client";
import { headers as nextHeaders } from "next/headers";
import type { NextRequest } from "next/server";

export async function verifyWebhook(req: NextRequest) {
  try {
    const { RESEND_WEBHOOK_SECRET } = env;

    if (!RESEND_WEBHOOK_SECRET) {
      throw new Error("Missing RESEND_WEBHOOK_SECRET environment variable");
    }

    const payload = await req.text();
    const headers = await nextHeaders();

    const svix_id = headers.get("svix-id");
    const svix_timestamp = headers.get("svix-timestamp");
    const svix_signature = headers.get("svix-signature");

    if (!(svix_id && svix_timestamp && svix_signature)) {
      throw new Error("Missing required Svix headers");
    }

    const result = resend.webhooks.verify({
      headers: {
        id: svix_id,
        signature: svix_signature,
        timestamp: svix_timestamp,
      },
      payload,
      webhookSecret: RESEND_WEBHOOK_SECRET,
    });
    return result;
  } catch (error) {
    throw normalizeError(error);
  }
}
