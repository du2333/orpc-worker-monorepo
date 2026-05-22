import { createContext } from "./context";
import type { ApiEnv } from "./context";
import { openAPIHandler } from "./orpc/handler";

export default {
  async fetch(request, env, executionContext) {
    const context = createContext(request, env, executionContext);
    const pathname = new URL(request.url).pathname;

    if (pathname === "/docs" || pathname === "/openapi.json") {
      const { response } = await openAPIHandler.handle(request, {
        context,
      });

      return response ?? new Response("Not Found", { status: 404 });
    }

    const { response } = await openAPIHandler.handle(request, {
      prefix: "/api",
      context,
    });

    return response ?? new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler<ApiEnv>;
