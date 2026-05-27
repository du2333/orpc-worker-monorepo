import { useEffect, useState, type PropsWithChildren } from "react";
import { AppState, Platform } from "react-native";
import * as Network from "expo-network";
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 30_000,
      },
    },
  });
}

function useReactNativeQueryManagers() {
  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    const subscription = AppState.addEventListener("change", (status) => {
      focusManager.setFocused(status === "active");
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    return onlineManager.setEventListener((setOnline) => {
      const subscription = Network.addNetworkStateListener((state) => {
        setOnline(state.isInternetReachable ?? state.isConnected ?? true);
      });

      return () => subscription.remove();
    });
  }, []);
}

export function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(createQueryClient);

  useReactNativeQueryManagers();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
