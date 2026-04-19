import 'reflect-metadata';

import http from 'node:http';

import { buildApp } from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';
import { logger } from './config/logger';
import { closeRedis, getRedisClient } from './config/redis';
import { registerDeps } from './container/registerDeps';
import { startCronJobs } from './cron';

async function bootstrap(): Promise<void> {
  // Initialize infra dependencies before serving requests.
  await connectDatabase();
  getRedisClient();
  registerDeps();

  const app = await buildApp();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    logger.info({ port: env.PORT, env: env.NODE_ENV }, 'HTTP server listening');
    logger.info(`GraphQL endpoint - http://localhost:${env.PORT}/graphql`);
  });

  startCronJobs();

  // Close HTTP and Redis gracefully when process receives termination signals.
  const shutdown = async (signal: string): Promise<void> => {
    logger.warn({ signal }, 'shutting down');
    server.close(() => logger.info('HTTP server closed'));
    await closeRedis();
    process.exit(0);
  };

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error({ err }, 'Fatal bootstrap error');
  process.exit(1);
});
