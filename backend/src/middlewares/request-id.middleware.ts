import type { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Reuse client correlation id when valid; otherwise generate a new one.
  const incoming = req.header('x-request-id');
  const id = incoming && incoming.length <= 128 ? incoming : uuidv4();
  req.requestId = id;
  res.setHeader('x-request-id', id);
  next();
}
