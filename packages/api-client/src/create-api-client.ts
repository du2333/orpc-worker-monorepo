import { createORPCClient } from "@orpc/client";
import type { ContractRouterClient } from "@orpc/contract";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { contract } from "@repo/api-contract";

type ApiHeaders = Headers | Record<string, string>;
type HeaderValue = ApiHeaders | Promise<ApiHeaders>;

export type CreateApiClientOptions = {
  url: string | URL | (() => string | URL);
  headers?: ApiHeaders | (() => HeaderValue);
  fetch?: typeof globalThis.fetch;
};

export type ApiClient = ContractRouterClient<typeof contract>;

export function createApiClient(options: CreateApiClientOptions): ApiClient {
  const link = new OpenAPILink(contract, {
    url: () => String(typeof options.url === "function" ? options.url() : options.url),
    headers: async () => {
      if (!options.headers) {
        return {};
      }

      return typeof options.headers === "function" ? await options.headers() : options.headers;
    },
    fetch: options.fetch,
  });

  return createORPCClient(link);
}
