import type { NextFunction, Request, Response } from 'express';

import { logger } from '../config/logger';

export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  logger.error({ err, requestId: req.requestId }, 'Unhandled error');
  const status = (err as { status?: number }).status ?? 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      requestId: req.requestId,
    },
  });
}
