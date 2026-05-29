import { z } from "zod";

export const clientEnvSchema = z.object({});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

export function getClientEnv(): ClientEnv {
  const result = clientEnvSchema.safeParse(import.meta.env);

  if (result.success) {
    return result.data;
  }

  throw new Error(
    [
      "Invalid web environment.",
      "Check apps/web/.env.local for local development.",
      JSON.stringify(z.treeifyError(result.error), null, 2),
    ].join("\n"),
  );
}

export const env = getClientEnv();
