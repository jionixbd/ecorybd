import { z } from "zod";

export const insertMediaSchema = z.object({
  height: z.number().optional(),
  key: z.string(),
  mimeType: z.string(),
  name: z.string(),
  size: z.number(),
  ufsUrl: z.url(),
  width: z.number().optional(),
});

export type InsertMediaInput = z.infer<typeof insertMediaSchema>;
