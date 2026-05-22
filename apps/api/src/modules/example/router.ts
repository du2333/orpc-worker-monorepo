import { authProcedure, publicProcedure } from "../../orpc/procedure";
import { greetingInputSchema, greetingOutputSchema, viewerOutputSchema } from "./schema";

export const exampleRouter = {
  greeting: publicProcedure
    .route({
      method: "POST",
      path: "/example/greeting",
      summary: "Create an example greeting",
      tags: ["Example"],
    })
    .errors({
      NAME_TOO_SHORT: {
        message: "Name must be at least 3 characters.",
        status: 422,
      },
    })
    .input(greetingInputSchema)
    .output(greetingOutputSchema)
    .handler(({ context, input, errors }) => {
      if (input.name.length < 3) {
        throw errors.NAME_TOO_SHORT();
      }

      return {
        message: `Hello, ${input.name} ${context.config.EXAMPLE_GREETING_SUFFIX}!`,
        requestedAt: new Date().toISOString(),
      };
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
