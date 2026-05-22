import generatedContract from "./contract.generated.json";
import type { AppRouter } from "@app/api/router";

const contract = generatedContract as unknown as AppRouter;
export { contract };
export type { AppRouter };
