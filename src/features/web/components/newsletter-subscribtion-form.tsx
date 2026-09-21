"use client";

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { subscribeAction } from "@/features/newsletter/actions/subscription";
import {
  type SubmitSubscriptionInput,
  submitSubscriptionSchema,
} from "@/features/newsletter/validations/subscription";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizontal } from "lucide-react";
import { useLocale } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const NewsletterSubscriptionForm = () => {
  const locale = useLocale();
  const { executeAsync, isExecuting } = useAction(subscribeAction, {
    onError({ error }) {
      toast.error(`[${error.serverError?.code}]: ${error.serverError?.code}`);
    },
    onSuccess({ data }) {
      toast.success(`Confirmation successfully sent to ${data.email}.`);
      form.reset({ email: "" });
    },
  });

  const form = useForm<SubmitSubscriptionInput>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(submitSubscriptionSchema),
  });

  async function onSubmit(values: SubmitSubscriptionInput) {
    await executeAsync({
      email: values.email,
      locale,
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-2">
      <form
        className="w-full"
        id="subscription-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="hidden">Subscription Form</FieldLegend>
            <FieldGroup>
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="hidden" htmlFor={field.name}>
                      Email
                    </FieldLabel>

                    <InputGroup className="h-12 rounded-full bg-[#ffffff12] pr-2 pl-2 md:h-14">
                      <InputGroupInput
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        className="font-light"
                        id={field.name}
                        placeholder="Enter your email"
                        {...field}
                      />

                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          className="h-8 rounded-full bg-secondary px-4 text-secondary-foreground md:h-10 dark:bg-primary dark:text-primary-foreground"
                          disabled={isExecuting}
                          form="subscription-form"
                          type="submit"
                          variant={"default"}
                        >
                          Subscribe
                          <SendHorizontal />
                        </InputGroupButton>
                      </InputGroupAddon>

                      <span className="absolute bottom-0 left-4.5 h-px w-[calc(100%-2.25rem)] bg-linear-to-r from-[#9B4DCA]/0 via-[#9B4DCA]/90 to-[#9B4DCA]/0 transition-opacity duration-500 group-hover:opacity-60" />
                    </InputGroup>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};
