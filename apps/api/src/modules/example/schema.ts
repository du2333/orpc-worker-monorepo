import { z } from "zod";

export const greetingInputSchema = z.object({
  name: z.string().min(1),
});

export const greetingOutputSchema = z.object({
  id: z.string(),
  message: z.string(),
  requestedAt: z.string(),
});

export const greetingsInputSchema = z
  .object({
    limit: z.number().int().min(1).max(50).optional(),
  })
  .optional();

export const greetingsOutputSchema = z.object({
  greetings: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      message: z.string(),
      createdAt: z.string(),
    }),
  ),
});

export const viewerOutputSchema = z.object({
  userId: z.string(),
  sessionId: z.string().optional(),
  scopes: z.array(z.string()),
});

export type GreetingInput = z.infer<typeof greetingInputSchema>;
export type GreetingOutput = z.infer<typeof greetingOutputSchema>;
export type GreetingsInput = z.infer<typeof greetingsInputSchema>;
export type GreetingsOutput = z.infer<typeof greetingsOutputSchema>;
export type ViewerOutput = z.infer<typeof viewerOutputSchema>;
