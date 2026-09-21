import { z } from "zod";

export const upsertUserSchema = z.object({
  avatar: z
    .url()
    .max(2048)
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  banned: z.boolean().default(false),
  clerkUserId: z.string().min(32),
  email: z.email(),
  firstName: z
    .string()
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  lastName: z
    .string()
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  locked: z.boolean().default(false),
  username: z.string().min(4).max(64),
});

export type UpsertUserInput = z.infer<typeof upsertUserSchema>;
