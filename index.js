require('dotenv').config();

import logger from 'lighthouse-dashboard-core/src/logger';
import server from './src/server';

logger.info(`Booting server`);
server();
