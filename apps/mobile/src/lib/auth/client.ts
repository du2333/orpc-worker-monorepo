import { expoClient } from "@better-auth/expo/client";
import { getSetCookie, normalizeCookieName } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

import { env } from "@/lib/env";
import mobileAppConfig from "@/lib/mobile-config.json";

const apiUrl = env.EXPO_PUBLIC_API_URL.replace(/\/$/, "");
const authCookieStorageKey = normalizeCookieName(`${mobileAppConfig.authStoragePrefix}_cookie`);

export const authBaseURL = `${apiUrl}/auth`;

export const authClient = createAuthClient({
  baseURL: authBaseURL,
  plugins: [
    expoClient({
      scheme: mobileAppConfig.scheme,
      storagePrefix: mobileAppConfig.authStoragePrefix,
      storage: SecureStore,
    }),
  ],
});

export function saveAuthSetCookieHeader(setCookieHeader: string) {
  const currentCookie = SecureStore.getItem(authCookieStorageKey) ?? undefined;
  const nextCookie = getSetCookie(setCookieHeader, currentCookie);

  SecureStore.setItem(authCookieStorageKey, nextCookie);
}
