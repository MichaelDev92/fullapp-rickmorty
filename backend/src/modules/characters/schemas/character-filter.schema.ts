import { z } from 'zod';

export const characterStatusSchema = z.enum(['Alive', 'Dead', 'unknown']);
export const characterGenderSchema = z.enum(['Female', 'Male', 'Genderless', 'unknown']);
export const sortDirectionSchema = z.enum(['ASC', 'DESC']);

export const characterFilterSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    status: characterStatusSchema.optional(),
    species: z.string().trim().min(1).max(80).optional(),
    gender: characterGenderSchema.optional(),
    origin: z.string().trim().min(1).max(120).optional(),
  })
  .strict();

export const paginationSchema = z
  .object({
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().max(100).default(20),
  })
  .strict();

export const findCharactersSchema = z
  .object({
    filter: characterFilterSchema.optional(),
    sortByName: sortDirectionSchema.optional(),
    pagination: paginationSchema.optional(),
    includeDeleted: z.boolean().optional(),
  })
  .strict();

export const characterIdSchema = z.coerce.number().int().positive();
