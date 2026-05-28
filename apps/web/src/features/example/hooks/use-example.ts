import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { orpc } from "@/lib/api/orpc";
import { handleORPCError } from "@/lib/api/error-handler";

export const greetingsQueryOptions = orpc.example.greetings.queryOptions({
  input: { limit: 10 },
});

export function useGreetingMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    orpc.example.greeting.mutationOptions({
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: greetingsQueryOptions.queryKey });
      },
      onError: (error) => {
        handleORPCError(error, {
          defined: {
            NAME_TOO_SHORT: () => toast.error("Name must be at least 3 characters."),
          },
          fallback: (unknownError) => {
            toast.error(
              unknownError instanceof Error ? unknownError.message : "Something went wrong.",
            );
          },
        });
      },
    }),
  );

  return { mutation };
}
