import type { Redis as RedisClient } from 'ioredis';
import type { Logger } from 'pino';

import { env } from '../config/env';

export class CacheService {
  constructor(
    private readonly redis: RedisClient,
    private readonly logger: Logger
  ) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await this.redis.get(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (err) {
      this.logger.warn({ err, key }, 'Cache get failed');
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    try {
      const payload = JSON.stringify(value);
      const ttl = ttlSeconds ?? env.CACHE_TTL_SECONDS;
      await this.redis.set(key, payload, 'EX', ttl);
    } catch (err) {
      this.logger.warn({ err, key }, 'Cache set failed');
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (err) {
      this.logger.warn({ err, key }, 'Cache delete failed');
    }
  }

  async invalidatePattern(pattern: string): Promise<number> {
    let deleted = 0;
    try {
      const stream = this.redis.scanStream({ match: pattern, count: 100 });
      const pipeline = this.redis.pipeline();
      for await (const keys of stream) {
        const list = keys as string[];
        if (list.length > 0) {
          list.forEach((k) => pipeline.del(k));
          deleted += list.length;
        }
      }
      await pipeline.exec();
    } catch (err) {
      this.logger.warn({ err, pattern }, 'Cache invalidate failed');
    }
    return deleted;
  }
}
