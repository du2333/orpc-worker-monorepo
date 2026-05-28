import { exampleGreetings, type AppDb } from "@repo/db";

export type ExampleGreetingRecord = typeof exampleGreetings.$inferSelect;

export type CreateExampleGreetingRecordInput = typeof exampleGreetings.$inferInsert;

export function createExampleRepository(db: AppDb) {
  return {
    async createGreeting(input: CreateExampleGreetingRecordInput): Promise<ExampleGreetingRecord> {
      const [greeting] = await db.insert(exampleGreetings).values(input).returning();

      if (!greeting) {
        throw new Error("Failed to create example greeting.");
      }

      return greeting;
    },
  };
}

export type ExampleRepository = ReturnType<typeof createExampleRepository>;
