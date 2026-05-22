import { orpc } from "@/lib/api/orpc";

export const greetingQueryOptions = orpc.example.greeting.queryOptions({
  input: { name: "Worker" },
});
