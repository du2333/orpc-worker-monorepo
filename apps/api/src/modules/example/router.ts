import { contract } from "@repo/api-contract";
import { implement } from "@orpc/server";

const os = implement(contract);

export const exampleRouter = {
  greeting: os.example.greeting.handler(({ input }) => ({
    message: `Hello, ${input.name}!`,
    requestedAt: new Date().toISOString(),
  })),
};
