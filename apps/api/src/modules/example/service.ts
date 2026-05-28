import type { ExampleRepository } from "@repo/db/example";

import { err, ok, type Result } from "../../shared/result";
import type { ExampleError } from "./errors";
import type { GreetingInput, GreetingOutput, GreetingsInput, GreetingsOutput } from "./schema";

export type CreateExampleServiceOptions = {
  greetingSuffix: string;
  repository: ExampleRepository;
};

export function createExampleService({ greetingSuffix, repository }: CreateExampleServiceOptions) {
  return {
    async createGreeting(input: GreetingInput): Promise<Result<GreetingOutput, ExampleError>> {
      if (input.name.length < 3) {
        return err({ code: "NAME_TOO_SHORT" });
      }

      const message = `Hello, ${input.name} ${greetingSuffix}!`;
      const greeting = await repository.createGreeting({
        id: crypto.randomUUID(),
        name: input.name,
        message,
        createdAt: new Date(),
      });

      return ok({
        id: greeting.id,
        message: greeting.message,
        requestedAt: greeting.createdAt.toISOString(),
      });
    },
    async listGreetings(input: GreetingsInput): Promise<GreetingsOutput> {
      const greetings = await repository.listGreetings(input?.limit ?? 10);

      return {
        greetings: greetings.map((greeting) => ({
          id: greeting.id,
          name: greeting.name,
          message: greeting.message,
          createdAt: greeting.createdAt.toISOString(),
        })),
      };
    },
  };
}

export type ExampleService = ReturnType<typeof createExampleService>;
