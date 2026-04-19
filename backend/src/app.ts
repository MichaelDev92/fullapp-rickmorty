import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import express, { type Application } from 'express';

import { env } from './config/env';
import { logger } from './config/logger';
import { buildContext } from './graphql/context';
import { buildSchema } from './graphql/schema';
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware';
import { requestIdMiddleware } from './middlewares/request-id.middleware';
import { requestLoggerMiddleware } from './middlewares/request-logger.middleware';
import type { GraphQLContext } from './types/graphql-context';

export async function buildApp(): Promise<Application> {
  const app = express();

  app.use(requestIdMiddleware);
  app.use(requestLoggerMiddleware);
  app.use(cors({ origin: env.CORS_ORIGIN.split(','), credentials: true }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
  });

  const apollo = new ApolloServer<GraphQLContext>({
    schema: buildSchema(),
    introspection: env.NODE_ENV !== 'production',
    formatError: (formatted, error) => {
      logger.error({ err: error, path: formatted.path }, 'GraphQL error');
      return formatted;
    },
    plugins: [
      {
        async requestDidStart() {
          const start = Date.now();
          return {
            async willSendResponse(ctx) {
              const duration = Date.now() - start;
              logger.info(
                {
                  operationName: ctx.request.operationName,
                  durationMs: duration,
                  requestId: ctx.contextValue.requestId,
                },
                'graphql.request'
              );
            },
          };
        },
      },
    ],
  });

  await apollo.start();

  app.use(
    '/graphql',
    expressMiddleware(apollo, {
      context: buildContext,
    })
  );

  app.use(errorHandlerMiddleware);

  return app;
}
