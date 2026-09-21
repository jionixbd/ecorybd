import type { WebhookEventPayload } from "resend";

export type WebhookEventType = WebhookEventPayload["type"];

export type HandlerMap = {
  [K in WebhookEventType]?: (
    data: Extract<WebhookEventPayload, { type: K }>["data"]
  ) => Promise<void>;
};

export type ContactCreated = Extract<
  WebhookEventPayload,
  { type: "contact.created" }
>["data"];

export type ContactUpdated = Extract<
  WebhookEventPayload,
  { type: "contact.updated" }
>["data"];

export type ContactDeleted = Extract<
  WebhookEventPayload,
  { type: "contact.deleted" }
>["data"];
