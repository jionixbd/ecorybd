"use server";
import { subscribeNewsletterUseCase } from "@/features/newsletter/use-cases/subscription";
import { submitSubscriptionSchema } from "@/features/newsletter/validations/subscription";
import { publicAction } from "@/lib/safe-action";

export const subscribeAction = publicAction
  .metadata({
    actionName: "newsletter.subscribe",
  })
  .inputSchema(submitSubscriptionSchema)
  .action(
    async ({ parsedInput }) =>
      await subscribeNewsletterUseCase({ input: parsedInput })
  );
