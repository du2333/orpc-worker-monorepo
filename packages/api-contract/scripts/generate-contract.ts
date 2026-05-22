import { minifyContractRouter } from "@orpc/contract";
import { router } from "@app/api/router";
import fs from "node:fs";

const contract = minifyContractRouter(router);

fs.writeFileSync("src/contract.generated.json", JSON.stringify(contract, null, 2));
