import { pinoHttp } from 'pino-http';

import { logger } from '../config/logger';

export const requestLoggerMiddleware = pinoHttp({
  logger,
  customProps: (req) => ({
    requestId: (req as { requestId?: string }).requestId,
  }),
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  serializers: {
    req: (req): Record<string, unknown> => ({
      method: req.method,
      url: req.url,
      remoteAddress: req.remoteAddress,
      userAgent: req.headers?.['user-agent'],
    }),
    res: (res): Record<string, unknown> => ({
      statusCode: res.statusCode,
    }),
  },
});
