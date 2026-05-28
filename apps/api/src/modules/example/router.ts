import { authProcedure, publicProcedure } from "../../orpc/procedure";
import { assertNever } from "../../shared/assert";
import { exampleErrorDefinitions } from "./errors";
import { createExampleRuntime } from "./runtime";
import {
  greetingInputSchema,
  greetingOutputSchema,
  greetingsInputSchema,
  greetingsOutputSchema,
  viewerOutputSchema,
} from "./schema";

export const exampleRouter = {
  greetings: publicProcedure
    .route({
      method: "GET",
      path: "/example/greetings",
      summary: "List recent example greetings",
      tags: ["Example"],
    })
    .input(greetingsInputSchema)
    .output(greetingsOutputSchema)
    .handler(async ({ context, input }) => {
      const example = createExampleRuntime(context);

      return example.listGreetings(input);
    }),
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
      const example = createExampleRuntime(context);
      const result = await example.createGreeting(input);

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
      userId: context.authSession.user.id,
      sessionId: context.authSession.session.id,
      scopes: [],
    })),
};
