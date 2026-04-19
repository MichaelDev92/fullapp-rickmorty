import cron from 'node-cron';

import { env } from '../config/env';
import { logger } from '../config/logger';

import { runRefreshCharactersJob } from './jobs/refresh-characters.job';

export function startCronJobs(): void {
  if (!env.CRON_ENABLED) {
    logger.info('Cron jobs disabled via CRON_ENABLED=false');
    return;
  }

  if (!cron.validate(env.CRON_REFRESH_CHARACTERS)) {
    logger.error(
      { expression: env.CRON_REFRESH_CHARACTERS },
      'Invalid cron expression for refresh-characters'
    );
    return;
  }

  cron.schedule(env.CRON_REFRESH_CHARACTERS, () => {
    void runRefreshCharactersJob();
  });

  logger.info(
    { expression: env.CRON_REFRESH_CHARACTERS },
    'refresh-characters cron scheduled'
  );
}
