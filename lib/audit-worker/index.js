import logger from '../logger';
import { consumeQueue } from './handler';
import { setCleanupRunning, setLastRunDate } from './utils/audit-worker-info-service';

/**
 * Start app with auto restart functionality
 * @return {Promise<void>}
 */
export default async function index() {
    logger.info(`Start audit worker`);
    await setCleanupRunning(true);
    await consumeQueue();
    await setLastRunDate(new Date());
    await setCleanupRunning(false);
    logger.debug(`Audit worker complete`);
}
