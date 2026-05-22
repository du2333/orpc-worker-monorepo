import type { ServerEnv } from "../env";

export type AuthContext = {
  userId: string;
  sessionId?: string;
  scopes: string[];
};

export type ApiExecutionContext = {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
};

export type ApiContext = {
  request: Request;
  headers: Headers;
  executionContext: ApiExecutionContext;
  config: ServerEnv;
  auth: AuthContext | null;
};
