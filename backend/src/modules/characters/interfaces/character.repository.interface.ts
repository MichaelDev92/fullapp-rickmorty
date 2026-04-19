import type { Character } from '../models/character.model';
import type { FindCharactersParams } from '../dtos/character-filter.dto';

export interface ICharacterRepository {
  findAll(params: FindCharactersParams): Promise<{ rows: Character[]; count: number }>;
  findById(id: number, includeDeleted?: boolean): Promise<Character | null>;
  findByExternalId(externalId: number): Promise<Character | null>;
  bulkUpsert(items: Array<Partial<Character>>): Promise<number>;
  softDelete(id: number): Promise<boolean>;
  restore(id: number): Promise<Character | null>;
}
