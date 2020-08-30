import logger from '../logger';
import { report } from '../reporter';
import { SERVER_CLEANUP } from '../reporter/Events';
import removeOldReports from './service/remove-old-reports';

/**
 * Start app with auto restart functionality
 * @param {number | boolean} maxReportsAge
 * @return {Promise<void>}
 */
export default async function index({ maxReportsAge }) {
    logger.info(`Start cleanup`);

    if (isNaN(maxReportsAge)) {
        logger.debug(`Skip cleanup due to no max age provided`);
    } else {
        report(SERVER_CLEANUP);
        await removeOldReports(maxReportsAge * 1000 * 60 * 60 * 24, true);
    }

    logger.info(`Cleanup complete`);
}