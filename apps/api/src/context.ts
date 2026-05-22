export type ApiEnv = Record<string, never>;

export type AuthContext = {
  userId: string;
  sessionId?: string;
  scopes: string[];
};

export type ApiContext = {
  env: ApiEnv;
  request: Request;
  headers: Headers;
  executionContext: ExecutionContext;
  auth: AuthContext | null;
};

export function createContext(
  request: Request,
  env: ApiEnv,
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
