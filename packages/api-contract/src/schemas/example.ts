import { z } from "zod";

export const greetingInputSchema = z.object({
  name: z.string().min(1),
});

export const greetingOutputSchema = z.object({
  message: z.string(),
  requestedAt: z.string(),
});

export type GreetingInput = z.infer<typeof greetingInputSchema>;
export type GreetingOutput = z.infer<typeof greetingOutputSchema>;
