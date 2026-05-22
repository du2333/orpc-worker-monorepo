import { exampleContract } from "./modules/example";
import { healthContract } from "./modules/health";

export const contract = {
  health: healthContract,
  example: exampleContract,
};

export type ApiContract = typeof contract;
