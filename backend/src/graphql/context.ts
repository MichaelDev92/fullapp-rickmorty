import type { Request, Response } from 'express';
import type { ContextFunction } from '@apollo/server';
import type { ExpressContextFunctionArgument } from '@apollo/server/express4';

import { logger } from '../config/logger';
import type { GraphQLContext } from '../types/graphql-context';

export const buildContext: ContextFunction<
  [ExpressContextFunctionArgument],
  GraphQLContext
> = async ({ req, res }: ExpressContextFunctionArgument): Promise<GraphQLContext> => {
  // Reuse incoming request id when available to keep trace continuity across services.
  const request = req as Request & { requestId?: string };
  const response = res as Response;
  const requestId = request.requestId ?? 'unknown';

  return {
    req: request,
    res: response,
    requestId,
    logger: logger.child({ requestId }),
  };
};
