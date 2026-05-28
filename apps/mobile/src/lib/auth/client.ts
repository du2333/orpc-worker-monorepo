import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

import { env } from "@/lib/env";
import mobileAppConfig from "@/lib/mobile-config.json";

const apiUrl = env.EXPO_PUBLIC_API_URL.replace(/\/$/, "");

export const authClient = createAuthClient({
  baseURL: `${apiUrl}/auth`,
  plugins: [
    expoClient({
      scheme: mobileAppConfig.scheme,
      storagePrefix: mobileAppConfig.authStoragePrefix,
      storage: SecureStore,
    }),
  ],
});
