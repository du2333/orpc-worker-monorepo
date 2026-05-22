import { contract } from "@repo/api-contract";
import { implement } from "@orpc/server";

import type { ApiContext } from "../context";

export const os = implement(contract).$context<ApiContext>();
