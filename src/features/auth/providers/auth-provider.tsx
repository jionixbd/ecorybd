"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ComponentProps } from "react";

export const AuthProvider = (props: ComponentProps<typeof ClerkProvider>) => {
  // TODO: Add @clerk/ui for clerk `appearance` when vulnerability resolve.
  return (
    <ClerkProvider
      {...props}
      appearance={{
        variables: {
          borderRadius: "var(--radius)",
          colorBackground: "var(--card)",
          colorBorder: "var(--border)",
          colorDanger: "var(--destructive)",
          colorForeground: "var(--card-foreground)",
          colorInput: "var(--input)",
          colorInputForeground: "var(--card-foreground)",
          colorMuted: "var(--muted)",
          colorMutedForeground: "var(--muted-foreground)",
          colorPrimary: "var(--primary)",
          colorPrimaryForeground: "var(--primary-foreground)",
          colorRing: "var(--color-ring)",
          colorSuccess: "var(--color-emerald-500)",
          colorWarning: "var(--color-amber-500)",
          fontFamily: "var(--font-sans)",
          fontFamilyButtons: "var(--font-sans)",
          fontFamilyMono: "var(--font-geist-mono)",
        },
      }}
    />
  );
};
