import {
  QueryErrorBoundary,
  type QueryErrorBoundaryProps,
} from "@/components/boundaries/query-error-boundary";
import { type ReactNode, Suspense } from "react";

interface SuspenseErrorBoundaryProps extends QueryErrorBoundaryProps {
  suspenseFallback?: ReactNode;
}

export const SuspenseErrorBoundary = ({
  children,
  errorFallback = null,
  suspenseFallback = null,
}: SuspenseErrorBoundaryProps) => (
  <QueryErrorBoundary errorFallback={errorFallback}>
    <Suspense fallback={suspenseFallback}>{children}</Suspense>
  </QueryErrorBoundary>
);
