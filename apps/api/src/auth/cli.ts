import * as dbSchema from "@repo/db/schema";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";

import { createBaseAuthOptions } from "./options";

const schemaOnlyDb = {};

export const auth = betterAuth({
  ...createBaseAuthOptions(),
  baseURL: "http://localhost:8787/api/auth",
  database: drizzleAdapter(schemaOnlyDb, {
    provider: "sqlite",
    schema: dbSchema,
  }),
  secret: "dev-only-better-auth-secret-change-me-please",
});
