require('dotenv').config();
import { createLogger, format, transports } from 'winston';
import SentryTransport from './sentry-transport';


export default createLogger({
    format: process.env.NODE_ENV !== 'development' ? format.json() : format.simple(),
    level: process.env.WINSTON_LOG_LEVEL,
    colorize: true,

    transports: [
        new transports.Console(),
    ],
    exceptionHandlers: [
        new SentryTransport(),
    ],
});
