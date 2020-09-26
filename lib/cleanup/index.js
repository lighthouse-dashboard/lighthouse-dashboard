import logger from '../logger';
import { MessageModel } from '../shared/models/message-model';
import { RawReportModel } from '../shared/models/raw-report-model';
import { ReportModel } from '../shared/models/report-model';
import removeOldEntries from './service/remove-old-entries';

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
        const maxAgeMs = maxReportsAge * 1000 * 60 * 60 * 24; // amount of days
        await removeOldEntries('RawReportModel', RawReportModel, maxAgeMs, true);
        await removeOldEntries('ReportModel', ReportModel, maxAgeMs, true);
        await removeOldEntries('Messages', MessageModel, maxAgeMs, true);
    }

    logger.info(`Cleanup complete`);
}
