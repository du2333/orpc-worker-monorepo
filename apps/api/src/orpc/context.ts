import type { AppDb } from "@repo/db";
import type { AppAuth, SessionWithUser } from "../auth/config";
import type { ServerEnv } from "../env";

export type ApiExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
};

export type ApiContext = {
  request: Request;
  headers: Headers;
  executionContext: ApiExecutionContext;
  config: ServerEnv;
  auth: AppAuth;
  db: AppDb;
};

export type AuthedApiContext = ApiContext & {
  authSession: SessionWithUser;
};
