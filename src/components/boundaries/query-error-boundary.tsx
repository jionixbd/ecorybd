import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

export interface QueryErrorBoundaryProps {
  children: ReactNode;
  errorFallback?: ReactNode | ((props: FallbackProps) => ReactNode);
}

export const QueryErrorBoundary = ({
  children,
  errorFallback = null,
}: QueryErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      fallbackRender={(fallbackProps) => {
        if (typeof errorFallback === "function") {
          return <>{errorFallback(fallbackProps)}</>;
        }
        return <>{errorFallback}</>;
      }}
      onReset={reset}
    >
      {children}
    </ErrorBoundary>
  );
};
