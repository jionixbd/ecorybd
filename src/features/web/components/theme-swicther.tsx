"use client";

import { TooltipButton } from "@/components/ui/tooltip-button";
import { cn } from "@/lib/shadcn/utils";
import { setCookie } from "cookies-next";
import { Squircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark");
  const pathname = usePathname();
  const t = useTranslations("web.theme");

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

  const handleThemeChange = (state: boolean) => {
    const newTheme = state ? "dark" : "light";
    setTheme(newTheme);
    setIsDarkMode(state);
  };

  return (
    <TooltipButton
      icon={Squircle}
      iconClassName={cn("size-6 fill-zinc-900 stroke-none! dark:fill-zinc-100")}
      // biome-ignore lint/performance/noJsxPropsBind: Intended
      onClick={() => handleThemeChange(!isDarkMode)}
      tooltip={t("themeSwitch")}
    />
  );
};
