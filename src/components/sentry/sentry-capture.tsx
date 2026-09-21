"use client";

import { Button } from "@/components/ui/button";
import { normalizeError } from "@/lib/error/";

export const SentryCapture = ({ label }: { label: string }) => {
  const handleClick = () => {
    try {
      throw new Error("Sentry test error — normalizeError");
    } catch (error) {
      const appError = normalizeError(error);
      console.log("Normalized Error:", appError.code, appError.isOperational);
    }
  };

  return (
    <Button
      className="cursor-pointer font-extralight text-destructive text-lg"
      onClick={handleClick}
      variant="link"
    >
      {label}
    </Button>
  );
};
