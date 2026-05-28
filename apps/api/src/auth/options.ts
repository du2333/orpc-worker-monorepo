import { expo } from "@better-auth/expo";
import type { BetterAuthOptions } from "better-auth";

export function createBaseAuthOptions() {
  return {
    appName: "oRPC Worker Monorepo",
    emailAndPassword: {
      enabled: true,
    },
    plugins: [expo()],
  } satisfies BetterAuthOptions;
}
