require('dotenv').config();

import logger from './lib/core/src/logger';
import server from './src/server';

logger.info(`Booting server`);
server();
