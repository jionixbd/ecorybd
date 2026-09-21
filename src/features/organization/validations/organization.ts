import { z } from "zod";

export const upsertOrganizationSchema = z.object({
  clerkOrganizationId: z.string().min(32),
  logo: z
    .url()
    .max(2048)
    .nullish()
    .transform((v) => (v === "" ? null : v)),
  name: z.string(),
  slug: z.string(),
});

export type UpsertOrganizationInput = z.infer<typeof upsertOrganizationSchema>;
