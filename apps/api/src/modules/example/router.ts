import { os } from "../../orpc/implementer";

export const exampleRouter = {
  greeting: os.example.greeting.handler(({ context, input }) => ({
    message: `Hello, ${input.name} ${context.config.EXAMPLE_GREETING_SUFFIX}!`,
    requestedAt: new Date().toISOString(),
  })),
  viewer: os.example.viewer
    .use(async ({ context, errors, next }) => {
      if (!context.auth) {
        throw errors.UNAUTHORIZED();
      }

      return next({
        context: {
          auth: context.auth,
        },
      });
    })
    .handler(({ context }) => ({
      userId: context.auth.userId,
      sessionId: context.auth.sessionId,
      scopes: context.auth.scopes,
    })),
};
