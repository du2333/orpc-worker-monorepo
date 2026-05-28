import { os } from "@orpc/server";
import type { ApiContext } from "./context";

export const baseProcedure = os.$context<ApiContext>();

export const publicProcedure = baseProcedure;

export const authProcedure = baseProcedure
  .errors({
    UNAUTHORIZED: {
      status: 401,
      message: "Authentication is required.",
    },
  })
  .use(async ({ context, errors, next }) => {
    const session = await context.auth.api.getSession({
      headers: context.headers,
    });

    if (!session) {
      throw errors.UNAUTHORIZED();
    }

    return next({
      context: {
        authSession: session,
      },
    });
  });
