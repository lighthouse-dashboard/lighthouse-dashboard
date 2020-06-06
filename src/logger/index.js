require('dotenv').config();
import { createLogger, format, transports } from 'winston';
import { version } from '../../package.json';
import SentryTransport from './sentry-transport';

require('winston-daily-rotate-file');

const myFormat = format.printf(({ level, version: v, service, message, timestamp }) => `${ timestamp } [${ service } - ${ v }] ${ level }: ${ message }`);

const winston = createLogger({
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

if (process.env.WINSTON_LOG_FILES === 'true') {
    winston.add(new transports.DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '5d',
        format: format.combine(
            format.timestamp(),
            myFormat
        ),
    }));
}

export default winston;
