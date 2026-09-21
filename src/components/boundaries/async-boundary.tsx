"use client";

import { DefaultErrorElement } from "@/components/errors/default-error-element";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

export interface AsyncBoundaryProps {
  children: ReactNode;
  errorFallback?: ReactNode | ((props: FallbackProps) => ReactNode);
  suspenseFallback?: ReactNode;
}

export const AsyncBoundary = ({
  children,
  suspenseFallback = null,
  errorFallback,
}: AsyncBoundaryProps) => (
  <ErrorBoundary
    fallbackRender={(props) => {
      if (typeof errorFallback === "function") {
        return errorFallback(props);
      }

      return (
        errorFallback ?? (
          <DefaultErrorElement resetErrorBoundary={props.resetErrorBoundary} />
        )
      );
    }}
  >
    <Suspense fallback={suspenseFallback}>{children}</Suspense>
  </ErrorBoundary>
);
