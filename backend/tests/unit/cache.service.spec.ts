import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { Logger } from 'pino';
import type { Redis as RedisClient } from 'ioredis';

import { CacheService } from '../../src/cache/cache.service';

function makeLogger(): Logger {
  // Minimal logger stub to isolate cache behavior from logging side effects.
  return {
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    fatal: vi.fn(),
    trace: vi.fn(),
    child: vi.fn(),
  } as unknown as Logger;
}

describe('CacheService', () => {
  let redis: RedisClient;
  let service: CacheService;

  beforeEach(() => {
    redis = {
      get: vi.fn(),
      set: vi.fn(),
      del: vi.fn(),
      scanStream: vi.fn(),
      pipeline: vi.fn(() => ({ del: vi.fn(), exec: vi.fn().mockResolvedValue([]) })),
    } as unknown as RedisClient;
    service = new CacheService(redis, makeLogger());
  });

  it('returns parsed value on cache hit', async () => {
    (redis.get as ReturnType<typeof vi.fn>).mockResolvedValue(JSON.stringify({ a: 1 }));
    const result = await service.get<{ a: number }>('key');
    expect(result).toEqual({ a: 1 });
  });

  it('returns null on cache miss', async () => {
    (redis.get as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const result = await service.get('missing');
    expect(result).toBeNull();
  });

  it('stores serialized payload with TTL', async () => {
    await service.set('key', { a: 1 }, 60);
    expect(redis.set).toHaveBeenCalledWith('key', JSON.stringify({ a: 1 }), 'EX', 60);
  });

  it('returns null when redis.get throws', async () => {
    (redis.get as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('boom'));
    const result = await service.get('key');
    expect(result).toBeNull();
  });
});
