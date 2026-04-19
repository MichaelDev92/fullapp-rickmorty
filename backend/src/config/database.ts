import { Sequelize } from 'sequelize-typescript';

import { env } from './env';
import { logger } from './logger';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  logging: env.NODE_ENV === 'development' ? (msg): void => logger.debug(msg) : false,
  models: [],
  define: {
    underscored: true,
    timestamps: true,
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export async function connectDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info('PostgreSQL connection established');
  } catch (error) {
    logger.error({ err: error }, 'Unable to connect to PostgreSQL');
    throw error;
  }
}
