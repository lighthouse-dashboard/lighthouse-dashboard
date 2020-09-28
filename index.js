import logger from './lib/logger';
import server from './src/server';
import './reporters';

logger.info(`Booting server`);

server();
