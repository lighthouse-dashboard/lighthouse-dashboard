import CONFIG from '../../config/server';
import * as reports from '../models/reports';
import { ReportModel } from '../models/reports/report-model';

const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');

/**
 * Create html report by report
 * @param {Reports.Report} report
 * @return {null|string|string[]}
 */
export function getHtmlReport(report) {
    if (!report || !report.raw) {
        return null;
    }
    return ReportGenerator.generateReport(JSON.parse(report.raw), 'html');
}

/**
 * Create html report by id
 * @param {Db} db
 * @param {string} id
 * @return {Promise<null|string|string[]>}
 */
export async function createHTMLReportById(db, id) {
    const report = await ReportModel.findById(id);
    return getHtmlReport(report.toJSON());
}

/**
 * Get latest report for site id
 * @param {Db} db
 * @param {string} siteId
 * @return {Promise<null> | Reports.Report}
 */
export async function getLatestReportBySiteId(siteId) {
    const report = await reports.getLatestReportBySiteId(siteId);

    if (!report) {
        return null;
    }

    return report;
}


/**
 * Get all reprots for site id
 * @param {Db} db
 * @param {string} id
 * @return {Promise<Reports.Report[]>}
 */
export async function getReportsBySiteId(db, id) {
    const models = await ReportModel.find({ siteId: id }).limit(CONFIG.api.siteReportLimit);
    return models.map(report => ({
        ...report.toJSON(),
        raw: JSON.parse(report.raw),
    }));
}
