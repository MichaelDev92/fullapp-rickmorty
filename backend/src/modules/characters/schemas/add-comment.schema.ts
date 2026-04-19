import { z } from 'zod';

export const addCommentSchema = z
  .object({
    characterId: z.coerce.number().int().positive(),
    author: z.string().trim().min(2).max(80),
    body: z.string().trim().min(1).max(2000),
  })
  .strict();

export type AddCommentInput = z.infer<typeof addCommentSchema>;
