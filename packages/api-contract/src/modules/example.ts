import { oc } from "@orpc/contract";

import { greetingInputSchema, greetingOutputSchema, viewerOutputSchema } from "../schemas/example";

export const exampleContract = {
  greeting: oc
    .route({
      method: "POST",
      path: "/example/greeting",
      summary: "Create an example greeting",
      tags: ["Example"],
    })
    .input(greetingInputSchema)
    .output(greetingOutputSchema),
  viewer: oc
    .route({
      method: "GET",
      path: "/example/viewer",
      summary: "Return the authenticated example viewer",
      tags: ["Example"],
    })
    .errors({
      UNAUTHORIZED: {
        status: 401,
        message: "Authentication is required.",
      },
    })
    .output(viewerOutputSchema),
};
