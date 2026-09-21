export type AppErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "CONFLICT"
  | "DATABASE_ERROR"
  | "INTERNAL_ERROR"
  | "EMAIL_ERROR"
  | "INVALID_TOKEN";

export class AppError extends Error {
  readonly isOperational: boolean;
  readonly code: AppErrorCode;

  constructor(
    message: string,
    code: AppErrorCode,
    options?: {
      isOperational?: boolean;
      cause?: unknown;
    }
  ) {
    super(message, { cause: options?.cause });

    this.name = this.constructor.name;
    this.code = code;
    this.isOperational = options?.isOperational ?? true;

    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, "NOT_FOUND");
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(message, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Access forbidden") {
    super(message, "FORBIDDEN");
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, "CONFLICT");
  }
}

export class InvalidTokenError extends AppError {
  constructor(message: string) {
    super(message, "INVALID_TOKEN");
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database operation failed", cause?: unknown) {
    super(message, "DATABASE_ERROR", {
      cause,
      isOperational: false,
    });
  }
}

export class EmailError extends AppError {
  constructor(message: string, isOperational: boolean, cause?: unknown) {
    super(message, "EMAIL_ERROR", { cause, isOperational });
  }
}

export class InternalError extends AppError {
  constructor(message = "An unexpected error occurred", cause?: unknown) {
    super(message, "INTERNAL_ERROR", {
      cause,
      isOperational: false,
    });
  }
}
