"use client";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

export const LocaleSwitcher = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("application.locale");

  const handleLocaleChange = (nextLocale: Locale | string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { params, pathname },
        { locale: nextLocale }
      );
    });
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Languages />
        {t("language")}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup
          onValueChange={handleLocaleChange}
          value={locale}
        >
          {routing.locales.map((localeOption) => (
            <DropdownMenuRadioItem
              disabled={isPending}
              id={localeOption}
              key={localeOption}
              value={localeOption}
            >
              {t(localeOption)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};
