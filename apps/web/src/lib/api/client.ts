import { createApiClient } from "@repo/api-client";

export const apiClient = createApiClient({
  url: () => import.meta.env.VITE_API_URL ?? "http://localhost:8787/api",
});
