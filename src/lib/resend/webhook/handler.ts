import { normalizeError } from "@/lib/error";
import type {
  ContactCreated,
  ContactDeleted,
  ContactUpdated,
  HandlerMap,
} from "@/lib/resend/webhook/types";
import type { WebhookEventPayload } from "resend";

const handlerMap: HandlerMap = {
  "contact.created": async (_: ContactCreated) => {},
  "contact.deleted": async (_: ContactDeleted) => {},
  "contact.updated": async (_: ContactUpdated) => {},
};

export async function handleEvent(event: WebhookEventPayload) {
  const handler = handlerMap[event.type];

  if (!handler) {
    return;
  }

  try {
    return await (handler as (data: typeof event.data) => Promise<void>)(
      event.data
    );
  } catch (error) {
    const appError = normalizeError(error);

    console.error("Resend Webhook handler failed", {
      error: appError.message,
      eventType: event.type,
    });

    throw appError;
  }
}
