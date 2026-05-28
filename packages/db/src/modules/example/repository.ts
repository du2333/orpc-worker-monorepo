import { desc } from "drizzle-orm";

import type { AppDb } from "../../client";
import { exampleGreetings } from "../../schema";

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
    async listGreetings(limit: number): Promise<ExampleGreetingRecord[]> {
      return db
        .select()
        .from(exampleGreetings)
        .orderBy(desc(exampleGreetings.createdAt))
        .limit(limit);
    },
  };
}

export type ExampleRepository = ReturnType<typeof createExampleRepository>;
