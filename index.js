import logger from './lib/core/logger';
import server from './src/server';

require('dotenv').config();

if (process.env.SENTRY_DSN) {
    logger.debug(`Setting up sentry`);
    // eslint-disable-next-line global-require
    const Sentry = require('@sentry/node');
    Sentry.init({ dsn: process.env.SENTRY_DSN });
}

logger.info(`Booting server`);
server();
