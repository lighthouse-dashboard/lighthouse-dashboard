require('dotenv').config();

import logger from './lib/logger';
import server from './src/server';

logger.info(`Booting server`);
server();
