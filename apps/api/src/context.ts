import { createDb } from "@repo/db";
import { createAuth } from "./auth/config";
import { getServerEnv } from "./env";
import type { ApiContext } from "./orpc/context";

export function createContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext<unknown>,
): ApiContext {
  const config = getServerEnv(env);
  const db = createDb(env.DB);

  return {
    request,
    headers: request.headers,
    executionContext,
    config,
    auth: createAuth({ config, db }),
    db,
  };
}
