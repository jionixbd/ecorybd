import { handleEvent } from "@/lib/resend/webhook/handler";
import { verifyWebhook } from "@/lib/resend/webhook/verify";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);

    await handleEvent(event);

    return new NextResponse(null, {
      status: 200,
    });
  } catch {
    return new NextResponse("Invalid webhook", { status: 400 });
  }
}
