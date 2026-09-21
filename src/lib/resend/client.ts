import { env } from "@/lib/env";
import { EmailError } from "@/lib/error/custom-errors";
import { resendEnabled } from "@/lib/resend/resend-enabled";
import { Resend } from "resend";

function createDisabledResendClient(): Resend {
  return new Proxy({} as Resend, {
    get() {
      throw new EmailError("Resend is disabled for this environment.", true);
    },
  });
}

export const resend: Resend = resendEnabled
  ? new Resend(env.RESEND_API_KEY)
  : createDisabledResendClient();
