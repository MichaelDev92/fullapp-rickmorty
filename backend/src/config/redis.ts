import Redis, { type Redis as RedisClient } from 'ioredis';

import { env } from './env';
import { logger } from './logger';

let client: RedisClient | null = null;

export function getRedisClient(): RedisClient {
  if (client) {
    return client;
  }

  client = new Redis({
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    lazyConnect: false,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    retryStrategy: (times: number): number => Math.min(times * 200, 2000),
  });

  client.on('ready', () => logger.info('Redis connection ready'));
  client.on('error', (err) => logger.error({ err }, 'Redis error'));
  client.on('reconnecting', () => logger.warn('Redis reconnecting'));

  return client;
}

export async function closeRedis(): Promise<void> {
  if (client) {
    await client.quit();
    client = null;
  }
}
