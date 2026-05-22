import { oc } from "@orpc/contract";
import { z } from "zod";

export const healthContract = {
  check: oc
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
    ),
};
