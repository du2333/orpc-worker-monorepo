import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { authBaseURL, authClient, saveAuthSetCookieHeader } from "@/lib/auth/client";
import mobileAppConfig from "@/lib/mobile-config.json";

type OAuthResult =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      message: string;
    };

export async function signInWithGitHub(): Promise<OAuthResult> {
  const callbackURL = Linking.createURL("/", {
    scheme: mobileAppConfig.scheme,
  });

  const result = await authClient.signIn.social({
    provider: "github",
    callbackURL,
    disableRedirect: true,
  });

  if (result.error) {
    return {
      ok: false,
      message: result.error.message ?? "GitHub sign in failed.",
    };
  }

  const authorizationURL = result.data?.url;

  if (!authorizationURL) {
    return {
      ok: false,
      message: "GitHub did not return an authorization URL.",
    };
  }

  // Work around @better-auth/expo dynamically importing expo-web-browser at runtime.
  // When that path is stable in Metro, this helper can return to authClient.signIn.social only.
  const proxyParams = new URLSearchParams({
    authorizationURL,
  });
  const browserResult = await WebBrowser.openAuthSessionAsync(
    `${authBaseURL}/expo-authorization-proxy?${proxyParams.toString()}`,
    callbackURL,
  );

  if (browserResult.type !== "success") {
    return {
      ok: false,
      message: "GitHub sign in was canceled.",
    };
  }

  const setCookieHeader = new URL(browserResult.url).searchParams.get("cookie");

  if (!setCookieHeader) {
    return {
      ok: false,
      message: "GitHub sign in finished without a session cookie.",
    };
  }

  saveAuthSetCookieHeader(setCookieHeader);

  return {
    ok: true,
    message: "GitHub sign in finished.",
  };
}
