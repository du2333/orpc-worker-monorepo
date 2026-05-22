import { getServerEnv } from "./env";
import type { ServerEnv } from "./env";

export type AuthContext = {
  userId: string;
  sessionId?: string;
  scopes: string[];
};

export type ApiContext = {
  env: Env;
  request: Request;
  headers: Headers;
  executionContext: ExecutionContext;
  config: ServerEnv;
  auth: AuthContext | null;
};

function getFakeAuthContext(): AuthContext {
  return {
    userId: "demo-user",
    sessionId: "demo-session",
    scopes: ["example:read"],
  };
}

export function createContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
): ApiContext {
  return {
    env,
    request,
    headers: request.headers,
    executionContext,
    config: getServerEnv(env),
    auth: getFakeAuthContext(),
  };
}
