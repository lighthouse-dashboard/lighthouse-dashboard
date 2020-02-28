require('dotenv').config();
import { createLogger, format } from 'winston';
import serverConfig from '../../config/server';

export default createLogger({
    format: format.simple(),
    level: process.env.WINSTON_LOG_LEVEL,
    colorize: true,

    transports: serverConfig.LOGGERS.filter(t => !!t),
    exceptionHandlers: serverConfig.EXCEPTION_HANDLERS.filter(t => !!t),
});
