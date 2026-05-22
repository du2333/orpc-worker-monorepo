import { oc } from "@orpc/contract";

import { greetingInputSchema, greetingOutputSchema } from "../schemas/example";

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
};
