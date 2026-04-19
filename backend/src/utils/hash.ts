import { createHash } from 'node:crypto';

export function stableHash(value: unknown): string {
  // Produce deterministic hashes for cache keys across equal argument objects.
  const json = JSON.stringify(value, Object.keys(value ?? {}).sort());
  return createHash('sha1').update(json).digest('hex');
}
