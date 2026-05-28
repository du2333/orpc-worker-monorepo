import { z } from "zod";

export const serverEnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_TRUSTED_ORIGINS: z.string().transform((value) =>
    value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  ),
  BETTER_AUTH_URL: z.url(),
  EXAMPLE_GREETING_SUFFIX: z.string().min(1),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getServerEnv(env: unknown): ServerEnv {
  const result = serverEnvSchema.safeParse(env);

  if (result.success) {
    return result.data;
  }

  throw new Error(
    [
      "Invalid API environment.",
      "Check apps/api/.dev.vars for local development or your deployed Worker vars/secrets.",
      JSON.stringify(z.treeifyError(result.error), null, 2),
    ].join("\n"),
  );
}
