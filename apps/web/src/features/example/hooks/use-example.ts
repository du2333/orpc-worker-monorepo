import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { orpc } from "@/lib/api/orpc";
import { handleORPCError } from "@/lib/api/error-handler";

export const greetingQueryOptions = orpc.example.greeting.queryOptions({
  input: { name: "Worker" },
});

export function useGreetingMutation() {
  const mutation = useMutation(
    orpc.example.greeting.mutationOptions({
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
