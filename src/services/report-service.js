import CONFIG from '../../config/server';
import * as reports from '../models/reports';

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
    const report = await reports.getReportById(db, id);
    return getHtmlReport(report);
}

/**
 * Get latest report for site id
 * @param {Db} db
 * @param {string} siteId
 * @return {Promise<null> | Reports.Report}
 */
export async function getLatestReportBySiteId(db, siteId) {
    const report = await reports.getLatestReportBySiteId(db, siteId);

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
    const assets = await reports.getReportsBySiteId(db, id, CONFIG.api.siteReportLimit);

    if (!assets || assets.length === 0) {
        return [];
    }

    return assets.map((report) => {
        report.hasRawData = !!report.raw;
        report.raw = null;
        return report;
    });
}
