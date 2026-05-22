import appHandler from "@tanstack/react-start/server-entry";

declare module "@tanstack/react-start" {
  interface Register {
    server: {
      requestContext: {
        env: Env;
        executionContext: ExecutionContext<unknown>;
      };
    };
  }
}

export default {
  fetch(request, env, executionContext) {
    return appHandler.fetch(request, {
      context: {
        env,
        executionContext,
      },
    });
  },
} satisfies ExportedHandler<Env>;
