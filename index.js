import logger from './lib/logger';
import { report } from './lib/reporter';
import { SERVER_STARTUP } from './lib/reporter/Events';
import server from './src/server';
import './reporters/index';

logger.info(`Booting server`);

report(SERVER_STARTUP);
server();
