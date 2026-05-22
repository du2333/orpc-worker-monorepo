import { z } from "zod";

import { publicProcedure } from "../../orpc/procedure";

export const healthRouter = {
  check: publicProcedure
    .route({
      method: "GET",
      path: "/health",
      summary: "Check API health",
      tags: ["Health"],
    })
    .output(
      z.object({
        ok: z.boolean(),
        service: z.literal("api"),
        timestamp: z.string(),
      }),
    )
    .handler(() => ({
      ok: true,
      service: "api" as const,
      timestamp: new Date().toISOString(),
    })),
};
