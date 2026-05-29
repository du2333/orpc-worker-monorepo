import { expo } from "@better-auth/expo";
import type { BetterAuthOptions } from "better-auth";
import type { AppDb } from "@repo/db";

import type { ServerEnv } from "../env";
import { createAuthDatabaseAdapter, createSchemaOnlyAuthDatabaseAdapter } from "./database-adapter";

type CreateAuthOptionsInput = {
  appName?: string;
  baseURL: string;
  database: BetterAuthOptions["database"];
  secret: string;
  socialProviders?: BetterAuthOptions["socialProviders"];
  trustedOrigins?: string[];
};

const defaultAppName = "oRPC Worker Monorepo";

export function createBaseAuthOptions({ appName = defaultAppName }: { appName?: string } = {}) {
  return {
    appName,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [expo()],
  } satisfies BetterAuthOptions;
}

export function createAuthOptions({
  appName,
  baseURL,
  database,
  secret,
  socialProviders,
  trustedOrigins,
}: CreateAuthOptionsInput) {
  return {
    ...createBaseAuthOptions({ appName }),
    baseURL,
    database,
    secret,
    socialProviders,
    trustedOrigins,
  } satisfies BetterAuthOptions;
}

export function createRuntimeAuthOptions({ config, db }: { config: ServerEnv; db: AppDb }) {
  return createAuthOptions({
    appName: config.APP_NAME,
    baseURL: config.BETTER_AUTH_URL,
    database: createAuthDatabaseAdapter(db),
    secret: config.BETTER_AUTH_SECRET,
    socialProviders: {
      github: {
        clientId: config.GITHUB_CLIENT_ID,
        clientSecret: config.GITHUB_CLIENT_SECRET,
      },
    },
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
