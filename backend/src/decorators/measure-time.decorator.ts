import { logger } from '../config/logger';

export function MeasureTime(label?: string): MethodDecorator {
  return function (
    _target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const original = descriptor.value as (...args: unknown[]) => unknown;
    const name = label ?? String(propertyKey);

    descriptor.value = async function (...args: unknown[]): Promise<unknown> {
      const start = process.hrtime.bigint();
      try {
        const result = await original.apply(this, args);
        const ns = Number(process.hrtime.bigint() - start);
        logger.info({ method: name, durationMs: (ns / 1e6).toFixed(2) }, 'method execution time');
        return result;
      } catch (err) {
        const ns = Number(process.hrtime.bigint() - start);
        logger.error(
          { err, method: name, durationMs: (ns / 1e6).toFixed(2) },
          'method execution failed'
        );
        throw err;
      }
    };

    return descriptor;
  };
}
