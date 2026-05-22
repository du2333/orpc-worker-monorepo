import { os } from "../../orpc/implementer";

export const exampleRouter = {
  greeting: os.example.greeting.handler(({ context, input }) => ({
    message: `Hello, ${input.name} ${context.config.EXAMPLE_GREETING_SUFFIX}!`,
    requestedAt: new Date().toISOString(),
  })),
};
