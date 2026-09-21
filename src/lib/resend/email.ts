import { env } from "@/lib/env";
import { normalizeError } from "@/lib/error";
import { parseResendError } from "@/lib/error/resend-error";
import { resend } from "@/lib/resend/client";
import { pretty, render, toPlainText } from "@react-email/render";
import * as Sentry from "@sentry/nextjs";

export interface SendEmailParams {
  from?: string;
  headers?: Record<string, string>;
  idempotencyKey?: string;
  replyTo?: string;
  subject: string;
  template: React.ReactElement;
  to: string | string[];
}

const DEFAULT_FROM = env.RESEND_EMAIL_FROM || "onboarding@resend.dev";

export const email = {
  async send({
    to,
    subject,
    template,
    replyTo,
    from = DEFAULT_FROM,
    idempotencyKey,
    headers,
  }: SendEmailParams) {
    return await Sentry.startSpan(
      { name: "EmailService.send", op: "email.send" },

      async () => {
        try {
          const html =
            process.env.NODE_ENV === "development"
              ? await pretty(await render(template))
              : await render(template);
          const text = toPlainText(html);

          const { data, error } = await resend.emails.send(
            {
              from,
              headers,
              html,
              replyTo,
              subject,
              text,
              to: Array.isArray(to) ? to : [to],
            },
            {
              idempotencyKey,
            }
          );

          if (error) {
            throw parseResendError(error);
          }

          return { id: data.id };
        } catch (rawError) {
          Sentry.setContext("email", {
            recipientCount: Array.isArray(to) ? to.length : 1,
            subject,
          });
          Sentry.setTag("service", "email");

          throw normalizeError(rawError);
        }
      }
    );
  },
};
