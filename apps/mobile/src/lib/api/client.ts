import { createApiClient } from "@repo/api-client";

import { env } from "@/lib/env";

export const apiClient = createApiClient({
  url: env.EXPO_PUBLIC_API_URL,
});
