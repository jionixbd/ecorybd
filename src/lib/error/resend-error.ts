// lib/error/resend-error.ts
import { EmailError } from "./custom-errors";

interface ResendErrorResponse {
  message: string;
  name: string;
}

const RESEND_NON_OPERATIONAL_CODES = new Set([
  "missing_api_key",
  "restricted_api_key",
  "suspended_api_key",
  "not_found",
  "method_not_allowed",
  "application_error",
  "service_unavailable",
  "email_above_quota",
]);

export function parseResendErrorMessage(code: string): string {
  switch (code) {
    case "invalid_idempotency_key":
      return "This request could not be processed. Please try again.";
    case "invalid_idempotent_request":
    case "concurrent_idempotent_requests":
      return "This email has already been sent or is currently being sent.";
    case "resource_locked":
      return "This item is currently being updated. Please try again shortly.";
    case "validation_error":
    case "invalid_parameter":
    case "invalid_attachment":
    case "missing_required_field":
    case "missing_required_parameter":
      return "The email could not be sent due to invalid information.";
    case "daily_quota_exceeded":
    case "monthly_quota_exceeded":
      return "Email sending limit reached. Please try again later.";
    case "rate_limit_exceeded":
      return "Too many emails sent recently. Please wait a moment and try again.";
    case "missing_api_key":
    case "restricted_api_key":
    case "suspended_api_key":
    case "invalid_permission":
    case "email_above_quota":
    case "not_found":
    case "method_not_allowed":
    case "application_error":
    case "service_unavailable":
    default:
      return "The email could not be sent. Please try again later.";
  }
}

export function parseResendError(error: ResendErrorResponse): EmailError {
  const isOperational = !RESEND_NON_OPERATIONAL_CODES.has(error.name);
  const friendlyMessage = parseResendErrorMessage(error.name);

  return new EmailError(friendlyMessage, isOperational, error);
}
