import { createDb } from "./db/client";
import { getServerEnv } from "./env";
import type { ApiContext, AuthContext } from "./orpc/context";

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
  executionContext: ExecutionContext<unknown>,
): ApiContext {
  return {
    request,
    headers: request.headers,
    executionContext,
    config: getServerEnv(env),
    auth: getFakeAuthContext(),
    db: createDb(env.DB),
  };
}
