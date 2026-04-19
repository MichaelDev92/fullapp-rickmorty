import pino, { type Logger } from 'pino';

import { env } from './env';

const isDev = env.NODE_ENV === 'development';

export const logger: Logger = pino({
  level: env.LOG_LEVEL,
  base: { service: 'rick-morty-api' },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(isDev
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname,service',
          },
        },
      }
    : {}),
});
