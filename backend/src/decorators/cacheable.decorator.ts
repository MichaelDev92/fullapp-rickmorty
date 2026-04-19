import type { CacheService } from '../cache/cache.service';
import { stableHash } from '../utils/hash';

export interface CacheableHost {
  cache: CacheService;
}

export function Cacheable(prefix: string, ttlSeconds?: number): MethodDecorator {
  return function (
    _target: object,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value as (...args: unknown[]) => Promise<unknown>;

    descriptor.value = async function (this: CacheableHost, ...args: unknown[]): Promise<unknown> {
      if (!this.cache) {
        return original.apply(this, args);
      }
      const key = `${prefix}:${stableHash(args)}`;
      const cached = await this.cache.get<unknown>(key);
      if (cached !== null) {
        return cached;
      }
      const result = await original.apply(this, args);
      await this.cache.set(key, result, ttlSeconds);
      return result;
    };

    return descriptor;
  };
}
