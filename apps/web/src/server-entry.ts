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
  async fetch(request, env, executionContext) {
    const url = new URL(request.url);

    if (
      url.pathname === "/api" ||
      url.pathname.startsWith("/api/") ||
      url.pathname === "/docs" ||
      url.pathname === "/openapi.json"
    ) {
      return env.API.fetch(request);
    }

    return await appHandler.fetch(request, {
      context: {
        env,
        executionContext,
      },
    });
  },
} satisfies ExportedHandler<Env>;
