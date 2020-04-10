import { clearReports, removeOldReports } from '../api/reports/db/reports';
import logger from '../logger';
import checkHealth from '../utils/check-health';
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
    process.exit(0);
}

/**
 * Booting worker
 */
boot();
