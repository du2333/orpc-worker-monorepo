import type { ErrorMap } from "@orpc/server";

export const exampleErrorDefinitions = {
  NAME_TOO_SHORT: {
    message: "Name must be at least 3 characters.",
    status: 422,
  },
} satisfies ErrorMap;

export type ExampleErrorCode = keyof typeof exampleErrorDefinitions;

export type ExampleError = {
  code: ExampleErrorCode;
};

export function exampleError<const TCode extends ExampleErrorCode>(code: TCode): { code: TCode } {
  return { code };
}
