import type { AppDb } from "@repo/db";
import * as dbSchema from "@repo/db/schema";
import { drizzleAdapter, type DB } from "@better-auth/drizzle-adapter";

export function createAuthDatabaseAdapter(db: AppDb | DB) {
  return drizzleAdapter(db, {
    provider: "sqlite",
    schema: dbSchema,
  });
}

export function createSchemaOnlyAuthDatabaseAdapter() {
  return createAuthDatabaseAdapter({});
}
