import {
  pgEnum,
  snakeCase,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const newsletterSubscribersStatusEnum = pgEnum(
  "newsletter_subscribers_status",
  ["pending", "subscribed", "unsubscribed"]
);

export const newsletterSubscribersLocaleEnum = pgEnum(
  "newsletter_subscribers_locale",
  ["en", "fr"]
);

export const newsletterSubscribersSourceEnum = pgEnum(
  "newsletter_subscribers_source",
  ["resend"]
);

export const newsletterSubscribers = snakeCase.table("newsletter_subscribers", {
  createdAt: timestamp({
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  email: varchar({ length: 255 })
    .unique("unq_newsletter_subscribers_email")
    .notNull(),
  firstName: varchar({ length: 55 }),
  lastName: varchar({ length: 55 }),
  locale: newsletterSubscribersLocaleEnum().default("en").notNull(),
  resendContactId: varchar({ length: 55 }),
  source: newsletterSubscribersSourceEnum().default("resend").notNull(),
  status: newsletterSubscribersStatusEnum().default("pending").notNull(),
  subscribedAt: timestamp({
    withTimezone: true,
  }),
  subscriberId: uuid().defaultRandom().primaryKey(),
  unsubscribedAt: timestamp({
    withTimezone: true,
  }),
  updatedAt: timestamp({
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
