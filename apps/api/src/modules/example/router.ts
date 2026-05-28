import { authProcedure, publicProcedure } from "../../orpc/procedure";
import { assertNever } from "../../shared/assert";
import { exampleErrorDefinitions } from "./errors";
import { createExampleRepository } from "./repository";
import { greetingInputSchema, greetingOutputSchema, viewerOutputSchema } from "./schema";
import { createExampleService } from "./service";

export const exampleRouter = {
  greeting: publicProcedure
    .route({
      method: "POST",
      path: "/example/greeting",
      summary: "Create an example greeting",
      tags: ["Example"],
    })
    .errors(exampleErrorDefinitions)
    .input(greetingInputSchema)
    .output(greetingOutputSchema)
    .handler(async ({ context, input, errors }) => {
      const service = createExampleService({
        greetingSuffix: context.config.EXAMPLE_GREETING_SUFFIX,
        repository: createExampleRepository(context.db),
      });
      const result = await service.createGreeting(input);

      if (result.error) {
        switch (result.error.code) {
          case "NAME_TOO_SHORT":
            throw errors.NAME_TOO_SHORT();
          default:
            assertNever(result.error.code);
        }
      }

      return result.data;
    }),
  viewer: authProcedure
    .route({
      method: "GET",
      path: "/example/viewer",
      summary: "Return the authenticated example viewer",
      tags: ["Example"],
    })
    .output(viewerOutputSchema)
    .handler(({ context }) => ({
      userId: context.auth.userId,
      sessionId: context.auth.sessionId,
      scopes: context.auth.scopes,
    })),
};
