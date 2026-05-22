import { createApiClient } from "@repo/api-client";
import { createIsomorphicFn, getGlobalStartContext } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

const getApiClient = createIsomorphicFn()
  .server(() => {
    return createApiClient({
      url: "https://api.internal/api",
      fetch: (input, init) => {
        const context = getGlobalStartContext();

        if (!context) {
          throw new Error("No global Start context found.");
        }

        return context.env.API.fetch(input, init);
      },
      headers: getRequestHeaders,
    });
  })
  .client(() =>
    createApiClient({
      url: "/api",
    }),
  );

export const apiClient = getApiClient();
