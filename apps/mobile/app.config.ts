import type { ExpoConfig } from "expo/config";

import mobileAppConfig from "./src/lib/mobile-config.json";

const config: ExpoConfig = {
  name: mobileAppConfig.name,
  slug: mobileAppConfig.slug,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: mobileAppConfig.scheme,
  userInterfaceStyle: "automatic",
  ios: {
    bundleIdentifier: "com.test.orpc-worker.dev",
    icon: "./assets/expo.icon",
  },
  android: {
    package: "com.test.orpc-worker.dev",
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        android: {
          image: "./assets/images/splash-icon.png",
          imageWidth: 76,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
