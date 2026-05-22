import { exampleRouter } from "../modules/example/router";
import { healthRouter } from "../modules/health/router";
import { baseProcedure } from "./procedure";

export const router = baseProcedure.router({
  health: healthRouter,
  example: exampleRouter,
});

export type AppRouter = typeof router;
