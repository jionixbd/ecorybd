import { z } from "zod";

export const upsertMembershipSchema = z.object({
  clerkMembershipId: z.string(),
  role: z.string().max(64),
});

export type UpsertMembershipInput = z.infer<typeof upsertMembershipSchema>;
