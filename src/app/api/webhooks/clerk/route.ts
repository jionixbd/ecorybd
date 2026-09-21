import { handleEvent } from "@/lib/clerk/webhook/handler";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);

    // console.log({ event });
    await handleEvent(event);

    return new Response(null, {
      status: 200,
    });
  } catch (error) {
    console.error("Clerk webhook failed:", error);

    return new Response("Webhook processing failed", {
      status: 500,
    });
  }
}
