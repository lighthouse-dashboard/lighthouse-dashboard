import logger from '../logger';
import { report } from '../reporter';
import { AUDIT_CHECK } from '../reporter/Events';
import { consumeQueue } from './handler';
import { setCleanupRunning, setLastRunDate } from './utils/audit-worker-info-service';

/**
 * Start app with auto restart functionality
 * @return {Promise<void>}
 */
export default async function index() {
    report(AUDIT_CHECK);
    logger.info(`Start audit worker`);
    await setCleanupRunning(true);
    await consumeQueue();
    await setLastRunDate(new Date());
    await setCleanupRunning(false);
    logger.debug(`Audit worker complete`);
}
