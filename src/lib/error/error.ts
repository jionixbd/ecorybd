import { AppError, DatabaseError } from "@/lib/error/custom-errors";
import { captureException } from "@sentry/nextjs";
import { DrizzleError, DrizzleQueryError } from "drizzle-orm";

export interface NamedPromise<T> {
  name: string;
  promise: Promise<T>;
}

export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    if (!error.isOperational) {
      safeCaptureException(error);
    }
    return error;
  }

  if (
    error instanceof DrizzleError ||
    error instanceof DrizzleQueryError ||
    isPostgresError(error)
  ) {
    const dbError = new DatabaseError(parseDrizzleError(error), error);

    if (!dbError.isOperational) {
      safeCaptureException(dbError);
    }
    return dbError;
  }

  if (error instanceof Error) {
    safeCaptureException(error);
    return new AppError(
      error.message || "An unexpected error occurred",
      "INTERNAL_ERROR",
      {
        cause: error,
        isOperational: false,
      }
    );
  }

  safeCaptureException(error);
  return new AppError("An unexpected error occurred", "INTERNAL_ERROR", {
    cause: error,
    isOperational: false,
  });
}

function safeCaptureException(error: unknown): void {
  try {
    captureException(error);
  } catch (newError) {
    console.log("Error capturing exception:", newError);
  }
}

function isPostgresError(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  );
}

export function parseDrizzleError(error: unknown): string {
  const code = getDatabaseErrorCode(error);

  switch (code) {
    case "23505":
      return "A record with this value already exists.";

    case "23503":
      return "A referenced record was not found.";

    case "23502":
      return "Required information is missing.";

    case "23514":
      return "The provided data violates a data constraint.";

    case "22P02":
      return "Invalid data provided.";

    case "23P01":
      return "The requested data conflicts with existing data.";

    case "40001":
      return "The operation could not be completed. Please try again.";

    default:
      return "Database operation failed.";
  }
}

function getDatabaseErrorCode(error: unknown): string | undefined {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  if (
    error instanceof DrizzleQueryError &&
    error.cause &&
    typeof error.cause === "object" &&
    "code" in error.cause &&
    typeof error.cause.code === "string"
  ) {
    return error.cause.code;
  }

  return undefined;
}

export function parsePromiseSettledError<T>(
  results: PromiseSettledResult<T>[],
  names: string[]
): AppError | null {
  const failures = results.flatMap((result, index) => {
    if (result.status !== "rejected") {
      return [];
    }

    return [`${names[index]}: ${normalizeError(result.reason).message}`];
  });

  if (failures.length === 0) {
    return null;
  }

  return new AppError(failures.join("; "), "INTERNAL_ERROR", {
    isOperational: false,
  });
}
