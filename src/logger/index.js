require('dotenv').config();
import { createLogger, format, transports } from 'winston';
import { version } from '../../package.json';
import SentryTransport from './sentry-transport';

export default createLogger({
    format: format.simple(),
    level: process.env.WINSTON_LOG_LEVEL,
    colorize: true,
    defaultMeta: {
        service: process.env.SERVICE_NAME || 'no-name-service',
        env: process.env.SENTRY_ENVIRONMENT,
        version,
    },

    transports: [
        new transports.Console(),
    ],
    exceptionHandlers: [
        process.env.SENTRY_DSN ? new SentryTransport() : new transports.Console(),
    ],
});
