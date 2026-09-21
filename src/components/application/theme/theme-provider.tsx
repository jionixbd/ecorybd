"use client";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const);

  return (
    <NextThemesProvider {...props} scriptProps={scriptProps}>
      <TooltipProvider>{children}</TooltipProvider>
      <Toaster />
    </NextThemesProvider>
  );
}
