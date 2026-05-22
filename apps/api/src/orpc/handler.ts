import { SmartCoercionPlugin } from "@orpc/json-schema";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";

import { router } from "./router";

const schemaConverter = new ZodToJsonSchemaConverter();

export const openAPIHandler = new OpenAPIHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(
        JSON.stringify({
          message: "API error",
          error:
            error instanceof Error
              ? {
                  name: error.name,
                  message: error.message,
                  stack: error.stack,
                }
              : String(error),
          timestamp: new Date().toISOString(),
        }),
      );
    }),
  ],
  plugins: [
    new CORSPlugin(),
    new SmartCoercionPlugin({
      schemaConverters: [schemaConverter],
    }),
    new OpenAPIReferencePlugin({
      docsPath: "/docs",
      specPath: "/openapi.json",
      schemaConverters: [schemaConverter],
      specGenerateOptions: {
        info: {
          title: "oRPC Worker Monorepo API",
          version: "0.1.0",
        },
        servers: [{ url: "http://localhost:8787/api" }],
      },
    }),
  ],
});
