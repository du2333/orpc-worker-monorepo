import type { AppDb } from "@repo/db";
import * as dbSchema from "@repo/db/schema";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth";

import type { ServerEnv } from "../env";
import { createBaseAuthOptions } from "./options";

export type CreateAuthOptions = {
  config: ServerEnv;
  db: AppDb;
};

export function createAuth({ config, db }: CreateAuthOptions) {
  return betterAuth({
    ...createBaseAuthOptions(),
    baseURL: config.BETTER_AUTH_URL,
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: dbSchema,
    }),
    secret: config.BETTER_AUTH_SECRET,
    trustedOrigins: config.BETTER_AUTH_TRUSTED_ORIGINS,
  });
}

export type AppAuth = ReturnType<typeof createAuth>;
export type SessionWithUser = AppAuth["$Infer"]["Session"];
