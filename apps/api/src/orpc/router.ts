import { exampleRouter } from "../modules/example/router";
import { healthRouter } from "../modules/health/router";
import { os } from "./implementer";

export const router = os.router({
  health: healthRouter,
  example: exampleRouter,
});
