"use client";

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { setCookie } from "cookies-next";
import { Palette } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type ThemeType = "light" | "dark" | "system";

const themes: ThemeType[] = ["light", "dark", "system"];

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const t = useTranslations("application.theme");

  useEffect(() => {
    if (theme) {
      setCookie("theme", theme, {
        maxAge: ONE_YEAR_IN_SECONDS,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
  }, [theme]);

  useEffect(() => {
    if (pathname === "/") {
      setTheme("dark");
    }
  }, [pathname, setTheme]);

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Palette />
        {t("theme")}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
          {themes.map((item) => (
            <DropdownMenuRadioItem
              className="flex items-center gap-2"
              key={item}
              value={item}
            >
              <span className="capitalize">{t(item)}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};
