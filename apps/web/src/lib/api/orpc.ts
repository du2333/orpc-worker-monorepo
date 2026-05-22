import { createTanstackQueryUtils } from "@orpc/tanstack-query";

import { apiClient } from "./client";

export const orpc = createTanstackQueryUtils(apiClient);
