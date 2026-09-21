import * as flags from "@/lib/feature-flags/flags";
import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";

export const GET = createFlagsDiscoveryEndpoint(() => getProviderData(flags));
