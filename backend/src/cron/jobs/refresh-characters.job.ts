import type { Logger } from 'pino';

import type { CacheService } from '../../cache/cache.service';
import { resolve, TOKENS } from '../../container/container';
import type { ICharacterRepository } from '../../modules/characters/interfaces/character.repository.interface';
import { CharacterMapper } from '../../modules/characters/mappers/character.mapper';
import type { RickMortyApiService } from '../../modules/characters/services/rick-morty-api.service';
import { CHARACTER_CACHE_PREFIX } from '../../modules/characters/services/character.service';

export async function runRefreshCharactersJob(): Promise<void> {
  const logger = resolve<Logger>(TOKENS.Logger).child({ job: 'refresh-characters' });
  const repo = resolve<ICharacterRepository>(TOKENS.CharacterRepository);
  const api = resolve<RickMortyApiService>(TOKENS.RickMortyApiService);
  const cache = resolve<CacheService>(TOKENS.CacheService);

  logger.info('starting refresh');
  try {
    // Pull latest catalog, upsert local records, then clear list caches.
    const apiCharacters = await api.fetchAll();
    const payload = apiCharacters.map((c) => CharacterMapper.fromApiToModelData(c));
    const count = await repo.bulkUpsert(payload);
    const invalidated = await cache.invalidatePattern(`${CHARACTER_CACHE_PREFIX}:*`);
    logger.info({ upserted: count, invalidated }, 'refresh completed');
  } catch (err) {
    logger.error({ err }, 'refresh failed');
  }
}
