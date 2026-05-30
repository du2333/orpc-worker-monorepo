import { useMutation, useQueryClient } from "@tanstack/react-query";

import { orpc } from "@/lib/api/orpc";

export const greetingsQueryOptions = orpc.example.greetings.queryOptions({
  input: { limit: 10 },
});

export function useGreetingMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    orpc.example.greeting.mutationOptions({
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: greetingsQueryOptions.queryKey });
      },
    }),
  );
}
