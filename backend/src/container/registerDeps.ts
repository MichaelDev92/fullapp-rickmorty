import { logger } from '../config/logger';
import { getRedisClient } from '../config/redis';
import { sequelize } from '../config/database';
import { CacheService } from '../cache/cache.service';
import { registerCharactersDeps } from '../modules/characters/registers/characters.deps';

import { registerValue, TOKENS } from './container';

export function registerDeps(): void {
  registerValue(TOKENS.Logger, logger);
  registerValue(TOKENS.Sequelize, sequelize);
  registerValue(TOKENS.Redis, getRedisClient());
  registerValue(TOKENS.CacheService, new CacheService(getRedisClient(), logger));

  registerCharactersDeps();
}
