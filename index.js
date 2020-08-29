import logger from './lib/logger';
import reporter from './lib/reporter';
import { SERVER_STARTUP } from './lib/reporter/Events';
import server from './src/server';

logger.info(`Booting server`);
reporter(SERVER_STARTUP);
server();
