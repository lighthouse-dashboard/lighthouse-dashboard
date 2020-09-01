import { RawReportModel } from '../../core/models/raw-report-model';
import { ReportModel } from '../../core/models/report-model';
import logger from '../../logger';

/**
 * Free up space in DB by remove old entries
 * @param {number} maxReportsAge
 * @param {boolean} removeEntries
 * @return {Promise<void>}
 */
export default async function removeOldReports(maxReportsAge, removeEntries = false) {
    const date = new Date(Date.now() - maxReportsAge).toISOString();
    const filter = {
        createdAt: {
            $lt: date,
        },
    };
    logger.info(`Remove all reports since ${ date }`);
    // const rawReportRows = await RawReportModel.find(filter);
    // logger.debug(`Found ${ rawReportRows.length } raw reports to remove`);

    // const reportRoes = await ReportModel.find(filter);
    // logger.debug(`Found ${ reportRoes.length } reports to remove`);

    if (removeEntries) {
        const rawModelDeletion = await RawReportModel.deleteMany(filter);
        logger.debug(`Removed ${ rawModelDeletion.deletedCount } raw reports`);

        const reportDeletion = await ReportModel.deleteMany(filter);
        logger.debug(`Removed ${ reportDeletion.deletedCount } reports`);
    } else {
        logger.info('Skipping removal of reports');
    }
}
