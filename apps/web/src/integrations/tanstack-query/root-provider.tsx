import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
      },
      mutations: {
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : "An error occurred");
        },
      },
    },
  });

  return {
    queryClient,
  };
}
