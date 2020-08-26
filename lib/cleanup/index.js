import logger from '../logger';
import { consumeQueue } from './handler';
import { setCleanupRunning, setLastRunDate } from './service/cleanup-service';
import removeOldReports from './service/remove-old-reports';

/**
 * Start app with auto restart functionality
 * @param {number | boolean} maxReportsAge
 * @return {Promise<void>}
 */
export default async function index({ maxReportsAge }) {
    await setCleanupRunning(true);

    if (isNaN(maxReportsAge)) {
        logger.debug(`Skip cleanup due to no max age provided`);
    } else {
        await removeOldReports(maxReportsAge * 1000 * 60 * 60 * 24, true);
    }

    logger.info(`Start audit worker`);
    await consumeQueue();
    await setLastRunDate(new Date());
    await setCleanupRunning(false);
    logger.debug(`Worker complete`);
}
