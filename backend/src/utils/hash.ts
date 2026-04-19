import { createHash } from 'node:crypto';

export function stableHash(value: unknown): string {
  const json = JSON.stringify(value, Object.keys(value ?? {}).sort());
  return createHash('sha1').update(json).digest('hex');
}
