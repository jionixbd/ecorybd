import { normalizeBanglaPhone } from "@/lib/normalize-bd-phone";
import { z } from "zod";

const BD_MOBILE_REGEX = /^(?:\+?8801|01)[3-9]\d{8}$/;

export const orderFormSchema = z.object({
  address: z.string().trim().min(8, "সম্পূর্ণ ঠিকানা পুরন করুন").max(2000),
  name: z.string().trim().min(2, "আপনার সম্পূর্ণ নাম লিখুন").max(255),
  phone: z
    .string()
    .trim()
    .transform(normalizeBanglaPhone)
    .refine((val) => BD_MOBILE_REGEX.test(val), {
      message: "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন",
    }),
  productVariantId: z.uuid("Choose a product option."),
  shippingMethodId: z.uuid(),
});

export type OrderFormInput = z.infer<typeof orderFormSchema>;
