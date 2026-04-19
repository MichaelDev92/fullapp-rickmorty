import { z } from 'zod';

export const toggleFavoriteSchema = z
  .object({
    characterId: z.coerce.number().int().positive(),
    sessionId: z.string().trim().min(8).max(64),
  })
  .strict();

export const favoriteQuerySchema = z
  .object({
    sessionId: z.string().trim().min(8).max(64),
  })
  .strict();

export type ToggleFavoriteInput = z.infer<typeof toggleFavoriteSchema>;
