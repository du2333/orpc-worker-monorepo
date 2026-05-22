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
  auth: AuthContext | null;
};

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
    auth: null,
  };
}
