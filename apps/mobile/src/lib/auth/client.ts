import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

import { env } from "@/lib/env";

const apiUrl = env.EXPO_PUBLIC_API_URL.replace(/\/$/, "");

export const authClient = createAuthClient({
  baseURL: `${apiUrl}/auth`,
  plugins: [
    expoClient({
      scheme: "orpc-worker-monorepo",
      storagePrefix: "orpc-worker-monorepo",
      storage: SecureStore,
    }),
  ],
});
