import { createApiClient } from "@repo/api-client";

import { authClient } from "@/lib/auth/client";
import { env } from "@/lib/env";

export const apiClient = createApiClient({
  url: env.EXPO_PUBLIC_API_URL,
  headers: () => ({
    cookie: authClient.getCookie(),
  }),
});
