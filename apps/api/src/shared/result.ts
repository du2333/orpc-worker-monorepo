export type Result<TData, TError extends { code: string }> =
  | {
      data: TData;
      error: null;
    }
  | {
      data: null;
      error: TError;
    };

export function ok<TData>(data: TData): Result<TData, never> {
  return { data, error: null };
}

export function err<const TCode extends string, TError extends { code: TCode }>(
  error: TError,
): Result<never, TError> {
  return { data: null, error };
}
