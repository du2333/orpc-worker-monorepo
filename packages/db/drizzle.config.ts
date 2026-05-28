import { defineConfig } from "drizzle-kit";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const localD1Directory = "../../apps/api/.wrangler/state/v3/d1/miniflare-D1DatabaseObject";

function getLocalD1DatabaseUrl() {
  if (!existsSync(localD1Directory)) {
    throw new Error(
      "Run `bun run --filter @app/api db:migrate:local` before opening Drizzle Studio.",
    );
  }

  const files = readdirSync(localD1Directory).filter(
    (file) => file.endsWith(".sqlite") && !file.startsWith("metadata."),
  );

  if (files.length !== 1) {
    throw new Error(`Expected one local D1 sqlite file, found ${files.length}.`);
  }

  const [databaseFile] = files;
  if (!databaseFile) {
    throw new Error("No local D1 sqlite file found.");
  }

  return join(localD1Directory, databaseFile);
}

export default defineConfig({
  dialect: "sqlite",
  out: "./drizzle/migrations",
  schema: "./src/schema/index.ts",
  dbCredentials: {
    url: getLocalD1DatabaseUrl(),
  },
});
