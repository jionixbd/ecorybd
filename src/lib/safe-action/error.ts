import type { AppErrorCode } from "@/lib/error";

export type AppServerError = {
  [K in AppErrorCode]: {
    code: K;
    message: string;
  };
}[AppErrorCode];
