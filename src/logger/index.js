require('dotenv').config();
import { createLogger, format } from 'winston';
import serverConfig from '../../config/server';
import { version } from '../../package.json';

export default createLogger({
    format: format.simple(),
    level: process.env.WINSTON_LOG_LEVEL,
    colorize: true,
    defaultMeta: {
        service: process.env.SERVICE_NAME || 'no-name-service',
        env: process.env.SENTRY_ENVIRONMENT,
        version,
    },

    transports: serverConfig.LOGGERS.filter(t => !!t),
    exceptionHandlers: serverConfig.EXCEPTION_HANDLERS.filter(t => !!t),
});
