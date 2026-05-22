import { z } from "zod";

const serverEnvSchema = z.object({
  EXAMPLE_GREETING_SUFFIX: z.string().min(1),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getServerEnv(env: Env): ServerEnv {
  return serverEnvSchema.parse(env);
}
