import { z } from "zod";

export const clientEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.url(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
type RawClientEnv = {
  [Key in keyof ClientEnv]: string | undefined;
};

export function getClientEnv(env: unknown): ClientEnv {
  const result = clientEnvSchema.safeParse(env);

  if (result.success) {
    return result.data;
  }

  throw new Error(
    [
      "Invalid mobile environment.",
      "Check apps/mobile/.env.local for local development.",
      "Expected EXPO_PUBLIC_API_URL to be a full URL, for example http://192.168.1.100:8787/api.",
      JSON.stringify(z.treeifyError(result.error), null, 2),
    ].join("\n"),
  );
}

const rawClientEnv = {
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
} satisfies RawClientEnv;

export const env = getClientEnv(rawClientEnv);
