import {
  newsletterSubscribersLocaleEnum,
  newsletterSubscribersSourceEnum,
  newsletterSubscribersStatusEnum,
} from "@/drizzle/schema/newsletter-subscriber";
import z from "zod";

export const submitSubscriptionSchema = z.object({
  email: z.email().max(255),
  locale: z
    .enum(newsletterSubscribersLocaleEnum.enumValues)
    .default("en")
    .optional(),
});

export const insertSubscriberSchema = z.object({
  email: z.email().max(255),
  firstName: z
    .string()
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  lastName: z
    .string()
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  locale: z.enum(newsletterSubscribersLocaleEnum.enumValues).default("en"),
  resendContactId: z
    .string()
    .max(255)
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  source: z.enum(newsletterSubscribersSourceEnum.enumValues).default("resend"),
  status: z.enum(newsletterSubscribersStatusEnum.enumValues).default("pending"),
  subscribedAt: z
    .date()
    .nullish()
    .or(z.literal(""))
    .transform((v) => (v === "" ? null : v)),
  unsubscribedAt: z
    .date()
    .nullish()
    .or(z.literal(""))
    .transform((v) => (v === "" ? null : v)),
});

export const updateSubscriberSchema = insertSubscriberSchema
  .pick({
    firstName: true,
    lastName: true,
    locale: true,
    resendContactId: true,
  })
  .partial();

export type InsertSubscriberInput = z.infer<typeof insertSubscriberSchema>;
export type UpdateSubscriberInput = z.infer<typeof updateSubscriberSchema>;
export type SubmitSubscriptionInput = z.infer<typeof submitSubscriptionSchema>;
