import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const exampleGreetings = sqliteTable("example_greetings", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});
