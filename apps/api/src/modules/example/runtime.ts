import { createExampleRepository } from "@repo/db/example";
import type { ApiContext } from "../../orpc/context";
import { createExampleService } from "./service";

export function createExampleRuntime(context: ApiContext) {
  const service = createExampleService({
    greetingSuffix: context.config.EXAMPLE_GREETING_SUFFIX,
    repository: createExampleRepository(context.db),
  });

  return service;
}
