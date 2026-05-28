import { expo } from "@better-auth/expo";
import type { BetterAuthOptions } from "better-auth";
import type { AppDb } from "@repo/db";

import type { ServerEnv } from "../env";
import { createAuthDatabaseAdapter, createSchemaOnlyAuthDatabaseAdapter } from "./database-adapter";

type CreateAuthOptionsInput = {
  baseURL: string;
  database: BetterAuthOptions["database"];
  secret: string;
  trustedOrigins?: string[];
};

export function createBaseAuthOptions() {
  return {
    appName: "oRPC Worker Monorepo",
    emailAndPassword: {
      enabled: true,
    },
    plugins: [expo()],
  } satisfies BetterAuthOptions;
}

export function createAuthOptions({
  baseURL,
  database,
  secret,
  trustedOrigins,
}: CreateAuthOptionsInput) {
  return {
    ...createBaseAuthOptions(),
    baseURL,
    database,
    secret,
    trustedOrigins,
  } satisfies BetterAuthOptions;
}

export function createRuntimeAuthOptions({ config, db }: { config: ServerEnv; db: AppDb }) {
  return createAuthOptions({
    baseURL: config.BETTER_AUTH_URL,
    database: createAuthDatabaseAdapter(db),
    secret: config.BETTER_AUTH_SECRET,
    trustedOrigins: config.BETTER_AUTH_TRUSTED_ORIGINS,
  });
}

export function createSchemaAuthOptions() {
  return createAuthOptions({
    baseURL: "http://localhost:8787/api/auth",
    database: createSchemaOnlyAuthDatabaseAdapter(),
    secret: "dev-only-better-auth-secret-change-me-please",
  });
}
