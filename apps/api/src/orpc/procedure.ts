import { ORPCError, os } from "@orpc/server";

import type { ApiContext } from "../context";

export const base = os.$context<ApiContext>();

export const requireAuth = base
  .errors({
    UNAUTHORIZED: {
      status: 401,
      message: "Authentication is required.",
    },
  })
  .middleware(async ({ context, errors, next }) => {
    if (!context.auth) {
      throw errors.UNAUTHORIZED();
    }

    return next({
      context: {
        auth: context.auth,
      },
    });
  });

export function forbidden(message = "You do not have permission to access this resource.") {
  return new ORPCError("FORBIDDEN", {
    status: 403,
    message,
  });
}
