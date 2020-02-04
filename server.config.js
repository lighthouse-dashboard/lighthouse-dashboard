import { transports } from 'winston';
import ConsoleReTransport from 'winston-consolere-transport';
import SentryTransport from './src/logger/sentry-transport';

export default {
    HOST: process.env.HOST || '0.0.0.0',
    PORT: process.env.PORT || 3000,
    API: {
        LOGIN_PASS: process.env.LOGIN_PASS,
        JWT_SECRET: process.env.JWT_SECRET,
        SITE_REPORT_LIMIT: 50,
    },
    AUDIT: {
        CHROMIUM_PATH: process.env.GOOGLE_CHROME_BIN,
        CHROMIUM_PORT: 9222,
    },
    DB: {
        MONGO_DB_URI: process.env.MONGODB_URI,
    },
    SHOW_ERROR_PAGES: process.env.SHOW_ERROR_PAGES || false,
    LOGGERS: [
        new transports.Console(),
        process.env.CONSOLE_RE_CHANNEL ? new ConsoleReTransport({ channel: process.env.CONSOLE_RE_CHANNEL }) : null,
    ],
    EXCEPTION_HANDLERS: [
        process.env.SENTRY_DSN ? new SentryTransport() : null,
    ],
};
