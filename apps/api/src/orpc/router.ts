import { contract } from "@repo/api-contract";
import { implement } from "@orpc/server";

import { exampleRouter } from "../modules/example/router";
import { healthRouter } from "../modules/health/router";

const os = implement(contract);

export const router = os.router({
  health: healthRouter,
  example: exampleRouter,
});
