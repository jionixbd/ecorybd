"use client";

import { TooltipButton } from "@/components/ui/tooltip-button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export const LocaleSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("web.locale");

  const handleLocaleChange = () => {
    const nextLocale = locale === "en" ? "fr" : "en";

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { params, pathname },
        { locale: nextLocale }
      );
    });
  };

  return (
    <TooltipButton
      disabled={isPending}
      onClick={handleLocaleChange}
      text={locale === "en" ? "🇺🇸" : "🇫🇷"}
      tooltip={locale === "en" ? t("switchFrench") : t("switchEnglish")}
    />
  );
};
