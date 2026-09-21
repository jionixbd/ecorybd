"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: NextError & { digest?: string };
  params: Promise<{ locale: string }>;
}

export default function GlobalError(props: GlobalErrorProps) {
  const statusCode = 500;

  useEffect(() => {
    Sentry.captureException(props.error);
  }, [props.error]);

  return (
    <html lang="en">
      <body>
        <NextError statusCode={statusCode} />
      </body>
    </html>
  );
}
