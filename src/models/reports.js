import logger from '../../lib/logger';
import { AUDIT_COLLECTION } from '../config/collections';
import { ReportModel } from './reports/report-model';


/**
 * Get latest report for site
 * @param {Db} database
 * @param {string} id
 * @return {Promise<Reports.Report>}
 */
export async function getLatestReportBySiteId(id) {
    const report = await ReportModel.findOne({ siteId: id }).sort({ createdAt: 1 });
    return report.toJSON();
}

/**
 * Save a new report in DB
 * @param {Db} database
 * @param {Reports.Report} reportData
 * @param {object} raw - raw lighthouse audit report
 */
export async function saveReport(database, reportData, raw) {
    const report = new ReportModel({ ...reportData });
    report.raw = process.env.LHD_IGNORE_RAW ? null : JSON.stringify(raw);
    if (process.env.LHD_IGNORE_RAW) {
        logger.debug('Ignore raw data');
    }
    await report.save();
}

/**
 * Free up space in DB by remove old raw lighthouse data
 * @param {Db} database
 * @param {number} maxRawReports
 * @return {Promise<void>}
 */
export async function clearReports(database, maxRawReports) {
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const filter = {
        raw: { $ne: false },
    };

    logger.debug(`Clearing older entries - Max allowed: ${ maxRawReports }`);

    const rows = await reportCollection.find(filter)
        .sort({ createdAt: -1 })
        .skip(maxRawReports)
        .toArray();

    const allIds = rows.reduce((acc, row) => {
        acc.push(row._id);
        return acc;
    }, []);

    logger.debug(`Found ${ allIds.length } rows to clear`);
    const { modifiedCount } = await reportCollection.updateMany({ _id: { $in: allIds } }, { $set: { raw: false } });
    logger.debug(`Cleared ${ modifiedCount } rows raw data`);
}

/**
 * Free up space in DB by remove old entries
 * @param {Db} database
 * @param {number} maxReportsAge
 * @return {Promise<void>}
 */
export async function removeOldReports(database, maxReportsAge) {
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const date = new Date(Date.now() - maxReportsAge).toISOString();
    const filter = {
        createdAt: {
            $lt: date,
        },
    };
    const rows = await reportCollection.countDocuments(filter);

    logger.debug(`Found ${ rows } reports to remove`);
    const { deletedCount } = await reportCollection.deleteMany(filter);
    logger.debug(`Removed ${ deletedCount } reports`);
}
