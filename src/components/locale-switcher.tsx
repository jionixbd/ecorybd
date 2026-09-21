"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/shadcn/utils";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export const LocaleSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("common.localeSwitcher");
  const locale = useLocale();

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { params, pathname },
        { locale: nextLocale }
      );
    });
  }

  return (
    <RadioGroup
      className="flex max-w-max items-center gap-2 font-light text-lg"
      onValueChange={onSelectChange}
    >
      <span>[</span>
      {routing.locales.map((localeOption, index) => (
        <div className="flex items-center gap-2" key={localeOption}>
          <RadioGroupItem
            className="hidden"
            disabled={isPending}
            id={localeOption}
            value={localeOption}
          />
          <Label
            className={cn(
              "cursor-pointer font-extralight text-lg",
              locale === localeOption && "underline underline-offset-2"
            )}
            htmlFor={localeOption}
          >
            {t(`${localeOption}`)}
          </Label>

          {index === 0 && <span> / </span>}
        </div>
      ))}
      <span>]</span>
    </RadioGroup>
  );
};
