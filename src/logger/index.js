require('dotenv').config();
import { createLogger, format } from 'winston';
import serverConfig from '../../server.config';

export default createLogger({
    format: process.env.NODE_ENV !== 'development' ? format.json() : format.simple(),
    level: process.env.WINSTON_LOG_LEVEL,
    colorize: true,

    transports: serverConfig.LOGGERS.filter(t => !!t),
    exceptionHandlers: serverConfig.EXCEPTION_HANDLERS.filter(t => !!t),
});
