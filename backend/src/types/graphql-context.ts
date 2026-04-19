import type { Request, Response } from 'express';
import type { Logger } from 'pino';

export interface GraphQLContext {
  req: Request;
  res: Response;
  requestId: string;
  logger: Logger;
}
