import { type FlagEntities, identify } from "@/lib/feature-flags/identify";
import { vercelAdapter } from "@flags-sdk/vercel";
import { flag } from "flags/next";

export const orderChartsFlag = flag<boolean, FlagEntities>({
  adapter: vercelAdapter(),
  defaultValue: false,
  description: "Controls access for showing order charts on orders page",
  identify,
  key: "order-charts",
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
