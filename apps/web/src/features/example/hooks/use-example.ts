import { orpc } from "@/lib/api/orpc";

export const greetingQueryOptions = (name: string) =>
  orpc.example.greeting.queryOptions({ input: { name } });
