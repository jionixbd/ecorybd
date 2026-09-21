import NewsletterConfirmation from "@/emails/templates/newsletter/newsletter-confirmation";
import NewsletterWelcome from "@/emails/templates/newsletter/newsletter-welcome";
import { getBaseUrl } from "@/lib/get-base-url";
import { email } from "@/lib/resend/email";
import type { Locale } from "next-intl";
import { createElement } from "react";

export interface SendConfirmSubscriptionEmailParams {
  appName: string;
  confirmUrl: string;
  locale: Locale;
  subscriptionId: string;
  to: string;
  unsubscribeUrl?: string;
}

export async function sendNewsletterConfirmationEmail({
  to,
  confirmUrl,
  appName,
  locale,
  subscriptionId,
  unsubscribeUrl,
}: SendConfirmSubscriptionEmailParams) {
  return await email.send({
    idempotencyKey: `subscription-confirmation:${subscriptionId}`,
    subject: "Confirm your subscription",
    template: createElement(NewsletterConfirmation, {
      appName,
      confirmUrl,
      locale,
      unsubscribeUrl,
    }),
    to,
  });
}

export interface SendNewsletterWelcomeEmailParams {
  appName: string;
  locale: Locale;
  subscriptionId: string;
  to: string;
  unsubscribeUrl: string;
}

export async function sendNewsletterWelcomeEmail({
  to,
  appName,
  locale,
  subscriptionId,
  unsubscribeUrl,
}: SendNewsletterWelcomeEmailParams) {
  return await email.send({
    headers: {
      "List-Unsubscribe": `<${unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    idempotencyKey: `newsletter-welcome:${subscriptionId}`,
    subject: `Welcome to ${appName}`,
    template: createElement(NewsletterWelcome, {
      actionUrl: getBaseUrl(),
      appName,
      locale,
      unsubscribeUrl,
    }),
    to,
  });
}
