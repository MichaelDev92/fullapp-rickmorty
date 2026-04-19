import { describe, expect, it, vi, beforeEach } from 'vitest';

import type { CacheService } from '../../src/cache/cache.service';
import type { FindCharactersParams } from '../../src/modules/characters/dtos/character-filter.dto';
import type { ICharacterRepository } from '../../src/modules/characters/interfaces/character.repository.interface';
import type { Character } from '../../src/modules/characters/models/character.model';
import { CharacterService } from '../../src/modules/characters/services/character.service';

function makeCharacter(partial: Partial<Character> = {}): Character {
  // Character fixture factory used across service unit tests.
  return {
    id: 1,
    externalId: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: null,
    gender: 'Male',
    originName: 'Earth (C-137)',
    originUrl: '',
    locationName: 'Citadel of Ricks',
    image: 'img.png',
    episodesCount: 51,
    created: new Date('2017-11-04T18:48:46.250Z'),
    deletedAt: null,
    ...partial,
  } as unknown as Character;
}

describe('CharacterService', () => {
  let repo: ICharacterRepository;
  let cache: CacheService;
  let service: CharacterService;

  beforeEach(() => {
    repo = {
      findAll: vi.fn(),
      findById: vi.fn(),
      findByExternalId: vi.fn(),
      bulkUpsert: vi.fn(),
      softDelete: vi.fn(),
      restore: vi.fn(),
    };
    cache = {
      get: vi.fn().mockResolvedValue(null),
      set: vi.fn().mockResolvedValue(undefined),
      delete: vi.fn().mockResolvedValue(undefined),
      invalidatePattern: vi.fn().mockResolvedValue(0),
    } as unknown as CacheService;
    service = new CharacterService(repo, cache);
  });

  it('returns paged result mapped to DTOs', async () => {
    const char = makeCharacter();
    (repo.findAll as ReturnType<typeof vi.fn>).mockResolvedValue({
      rows: [char],
      count: 1,
    });
    const params: FindCharactersParams = { pagination: { page: 1, pageSize: 20 } };
    const result = await service.findAll(params);
    expect(result.total).toBe(1);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('Rick Sanchez');
  });

  it('soft delete invalidates cache when successful', async () => {
    (repo.softDelete as ReturnType<typeof vi.fn>).mockResolvedValue(true);
    const ok = await service.softDelete(1);
    expect(ok).toBe(true);
    expect(cache.invalidatePattern).toHaveBeenCalled();
  });

  it('soft delete does not invalidate when not removed', async () => {
    (repo.softDelete as ReturnType<typeof vi.fn>).mockResolvedValue(false);
    const ok = await service.softDelete(1);
    expect(ok).toBe(false);
    expect(cache.invalidatePattern).not.toHaveBeenCalled();
  });

  it('findById returns null when character does not exist', async () => {
    (repo.findById as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const result = await service.findById(999);
    expect(result).toBeNull();
  });
});
