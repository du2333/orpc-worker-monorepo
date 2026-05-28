import { z } from "zod";

export const greetingInputSchema = z.object({
  name: z.string().min(1),
});

export const greetingOutputSchema = z.object({
  id: z.string(),
  message: z.string(),
  requestedAt: z.string(),
});

export const viewerOutputSchema = z.object({
  userId: z.string(),
  sessionId: z.string().optional(),
  scopes: z.array(z.string()),
});

export type GreetingInput = z.infer<typeof greetingInputSchema>;
export type GreetingOutput = z.infer<typeof greetingOutputSchema>;
export type ViewerOutput = z.infer<typeof viewerOutputSchema>;
