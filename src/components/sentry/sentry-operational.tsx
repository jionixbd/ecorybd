"use client";

import { Button } from "@/components/ui/button";
import { AppError, normalizeError } from "@/lib/error";

export const SentryOperational = ({ label }: { label: string }) => {
  const handleClick = () => {
    try {
      throw new AppError("This is expected, not a bug", "VALIDATION_ERROR", {
        isOperational: true,
      });
    } catch (error) {
      const appError = normalizeError(error);
      console.log("Normalized Error:", appError.code, appError.isOperational);
    }
  };

  return (
    <Button
      className="cursor-pointer font-extralight text-lg"
      onClick={handleClick}
      variant="link"
    >
      {label}
    </Button>
  );
};
