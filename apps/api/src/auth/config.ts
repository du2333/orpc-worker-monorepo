import type { AppDb } from "@repo/db";
import { betterAuth } from "better-auth";

import type { ServerEnv } from "../env";
import { createRuntimeAuthOptions } from "./options";

export type CreateAuthOptions = {
  config: ServerEnv;
  db: AppDb;
};

export function createAuth({ config, db }: CreateAuthOptions) {
  return betterAuth(createRuntimeAuthOptions({ config, db }));
}

export type AppAuth = ReturnType<typeof createAuth>;
export type SessionWithUser = AppAuth["$Infer"]["Session"];
