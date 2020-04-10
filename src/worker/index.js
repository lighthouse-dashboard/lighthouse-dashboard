import { clearReports, removeOldReports } from '../api/reports/db/reports';
import logger from '../logger';
import { consumeQueue } from './handler';

require('dotenv').config();

const RESTART_INTERVAL = process.env.RESTART_TIMEOUT;

/**
 * Start app with auto restart functionality
 * @return {Promise<void>}
 */
async function boot() {
    await removeOldReports();
    await clearReports();

    logger.info(`Start audit worker`);
    await consumeQueue(process.env.MESSAGE_QUEUE_URI, 'audits');
}

/**
 * Booting worker
 */
boot();
