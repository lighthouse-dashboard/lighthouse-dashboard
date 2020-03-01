import Hapi from '@hapi/hapi';
import healthRotues from '../api/health/routes';
import logger from '../logger';
import checkHealth from '../utils/check-health';
import { consumeQueue } from './handler';

const RESTART_INTERVAL = process.env.RESTART_TIMEOUT;

/**
 * Start fake server to check health
 * @return {Promise<void>}
 */
async function startServer() {
    logger.debug(`Start fake server on ${ process.env.PORT }`);
    const server = Hapi.server({
        port: process.env.PORT,
        host: '0.0.0.0',
    });

    healthRotues.map((route) => server.route(route));
    await server.start();

    logger.debug(`Server started`);
}

/**
 * Start app with auto restart functionality
 * @return {Promise<void>}
 */
async function boot() {
    logger.info(`Start audit worker`);
    try {
        if (!await checkHealth()) {
            return;
        }
        await consumeQueue(process.env.MESSAGE_QUEUE_URI, 'audits');
    } catch (e) {
        logger.error(e);
        logger.debug(`Rebooting worker in ${ RESTART_INTERVAL }ms`);
        setTimeout(() => boot(), RESTART_INTERVAL);
    }
}

/**
 * Booting worker
 */
export default async function() {
    await startServer();
    boot();
}
