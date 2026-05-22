import { contract } from "@repo/api-contract";
import { implement } from "@orpc/server";

const os = implement(contract);

export const healthRouter = {
  check: os.health.check.handler(() => ({
    ok: true,
    service: "api" as const,
    timestamp: new Date().toISOString(),
  })),
};
