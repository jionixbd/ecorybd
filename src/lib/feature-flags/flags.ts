import { type FlagEntities, identify } from "@/lib/feature-flags/identify";
import { vercelAdapter } from "@flags-sdk/vercel";
import { flag } from "flags/next";

export const newsletterFlag = flag<boolean, FlagEntities>({
  adapter: vercelAdapter(),
  defaultValue: false,
  description: "Controls access to the newsletter feature.",
  identify,
  key: "newsletter",
  options: [
    {
      label: "Enabled",
      value: true,
    },
    {
      label: "Disabled",
      value: false,
    },
  ],
});
