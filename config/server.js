import devErrors from 'hapi-dev-errors';
import { transports } from 'winston';
import SentryTransport from '../src/logger/sentry-transport';

export default {
    HOST: process.env.HOST || '0.0.0.0',
    PORT: process.env.PORT || 4000,
    API: {
        SITE_REPORT_LIMIT: 50,
    },
    AUDIT: {
        CHROMIUM_PATH: process.env.GOOGLE_CHROME_BIN,
        CHROMIUM_PORT: 9222,
    },
    SHOW_ERROR_PAGES: process.env.SHOW_ERROR_PAGES || false,
    LOGGERS: [
        new transports.Console(),
    ],
    EXCEPTION_HANDLERS: [
        new transports.Console(),
        process.env.SENTRY_DSN ? new SentryTransport() : null,
    ],
    HAPI_PLUGINS: [
        {
            plugin: devErrors,
            options: {
                showErrors: process.env.SHOW_ERROR_PAGES,
            },
        },
    ],
};
