import { db } from "@/drizzle/db";
import type { NewsletterSubscriber } from "@/drizzle/schema";
import {
  sendNewsletterConfirmationEmail,
  sendNewsletterWelcomeEmail,
} from "@/emails/send/newsletter";
import {
  findSubscriberEmail,
  findSubscriberId,
  insertSubscriber,
  setConfirmSubscriber,
  setPendingSubscriber,
  setUnsubscribeSubscriber,
  updateSubscriber,
} from "@/features/newsletter/data-access/subscriber";
import {
  createSubscriptionToken,
  verifySubscriptionToken,
} from "@/features/newsletter/lib/newsletter-subscription-token";
import {
  insertSubscriberSchema,
  type SubmitSubscriptionInput,
} from "@/features/newsletter/validations/subscription";
import { APP_NAME } from "@/lib/config";
import { env } from "@/lib/env";
import { NotFoundError, normalizeError } from "@/lib/error";
import { createContact, updateContactId } from "@/lib/resend/contacts";
import { resolveApiUrl } from "@/lib/resolve-api-url";

export async function subscribeNewsletterUseCase({
  input,
}: {
  input: SubmitSubscriptionInput;
}) {
  try {
    const existing = await findSubscriberEmail({
      client: db,
      email: input.email,
    });

    if (existing && existing.status === "subscribed") {
      return existing;
    }

    let subscriber: NewsletterSubscriber;

    if (existing) {
      subscriber = await setPendingSubscriber({
        client: db,
        subscriberId: existing.subscriberId,
      });
    } else {
      const values = insertSubscriberSchema.parse(input);

      subscriber = await insertSubscriber({
        client: db,
        values,
      });
    }

    const token = await createSubscriptionToken(
      subscriber.subscriberId,
      "confirm"
    );
    const confirmUrl = resolveApiUrl(`/newsletter/subscribe?token=${token}`);

    // FIX: What if `sendNewsletterConfirmationEmail()` failed.
    await sendNewsletterConfirmationEmail({
      appName: APP_NAME,
      confirmUrl,
      locale: subscriber.locale,
      subscriptionId: subscriber.subscriberId,
      to: input.email,
    });

    return subscriber;
  } catch (error) {
    throw normalizeError(error);
  }
}

export async function confirmNewsletterSubscriptionUseCase({
  token,
}: {
  token: string;
}) {
  const subscriberId = await verifySubscriptionToken(token, "confirm");

  try {
    const subscriber = await findSubscriberId({ client: db, subscriberId });

    if (!subscriber) {
      throw new NotFoundError("Subscriber not found.");
    }

    if (subscriber.status === "unsubscribed") {
      return { status: "unsubscribed" as const };
    }

    if (subscriber.status === "subscribed" && subscriber.resendContactId) {
      return { status: "already_subscribed" as const };
    }

    const confirmed = await setConfirmSubscriber({ client: db, subscriberId });

    const contact = await createContact({
      email: confirmed.email,
      firstName: confirmed.firstName ?? undefined,
      lastName: confirmed.lastName ?? undefined,
      segmentIds: [env.RESEND_SEGMENT_ID as string],
      unsubscribed: false,
    });

    await updateSubscriber({
      client: db,
      subscriberId,
      values: { resendContactId: contact.id },
    });

    const unsubscribeToken = await createSubscriptionToken(
      confirmed.subscriberId,
      "unsubscribe"
    );
    const unsubscribeUrl = resolveApiUrl(
      `/newsletter/unsubscribe?token=${unsubscribeToken}`
    );

    await sendNewsletterWelcomeEmail({
      appName: APP_NAME,
      locale: confirmed.locale,
      subscriptionId: confirmed.subscriberId,
      to: confirmed.email,
      unsubscribeUrl,
    });

    return { status: "subscribed" as const };
  } catch (error) {
    const e = normalizeError(error);

    if (e.code === "EMAIL_ERROR") {
      try {
        await setPendingSubscriber({
          client: db,
          subscriberId,
        });
      } catch (rollbackError) {
        const re = normalizeError(rollbackError);

        console.error(
          "Failed to restore newsletter subscriber to pending state",
          re
        );
      }
    }

    throw e;
  }
}

export async function unsubscribeNewsletterUseCase({
  token,
}: {
  token: string;
}) {
  const subscriberId = await verifySubscriptionToken(token, "unsubscribe");

  try {
    const subscriber = await findSubscriberId({ client: db, subscriberId });

    if (!subscriber || subscriber.status === "unsubscribed") {
      return { status: "unsubscribed" as const };
    }

    const unsubscribed = await setUnsubscribeSubscriber({
      client: db,
      subscriberId,
    });

    if (unsubscribed.resendContactId) {
      await updateContactId({
        contactId: unsubscribed.resendContactId,
        values: {
          unsubscribed: true,
        },
      });
    }

    return { status: "unsubscribed" as const };
  } catch (error) {
    const e = normalizeError(error);

    if (e.code === "EMAIL_ERROR") {
      try {
        await setPendingSubscriber({
          client: db,
          subscriberId,
        });
      } catch (rollbackError) {
        const re = normalizeError(rollbackError);

        console.error(
          "Failed to restore newsletter subscriber to pending state",
          re
        );
      }
    }

    throw e;
  }
}
