import { os } from "../../orpc/implementer";

export const healthRouter = {
  check: os.health.check.handler(() => ({
    ok: true,
    service: "api" as const,
    timestamp: new Date().toISOString(),
  })),
};
