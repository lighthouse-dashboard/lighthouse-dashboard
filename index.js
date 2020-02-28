import logger from './src/logger';
import server from './src/server';
import worker from './src/worker';

require('dotenv').config();

if (process.env.IS_WORKER) {
    logger.info(`Booting worker`);
    worker();
} else {
    logger.info(`Booting server`);
    server();
}
