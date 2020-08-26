import CONFIG from '../../config/server';
import logger from '../../lib/logger';
import { RawReportModel } from '../models/raw-report-model';
import { ReportModel } from '../models/reports/report-model';

const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');

/**
 * Get latest report for site
 * @param {string} id
 * @return {Promise<Reports.Report | null>}
 */
export async function getLatestReportBySiteId(id) {
    const report = await ReportModel.findOne({ siteId: id }).sort({ createdAt: -1 });
    if (!report) {
        return null;
    }
    return report.toObject();
}

/**
 * Get all reports for site id
 * @param {string} id
 * @return {Promise<Reports.Report[]>}
 */
export async function getReportsBySiteId(id) {
    const models = await ReportModel
        .find({ siteId: id })
        .sort({ createdAt: -1 })
        .limit(CONFIG.api.siteReportLimit);
    return models.map(report => report.toObject());
}

/**
 * Save a new report in DB
 * @param {Reports.Report} reportData
 * @param {object} raw - raw lighthouse audit report
 */
export async function saveReport(reportData, raw) {
    logger.debug('Save new report');
    const report = new ReportModel({ ...reportData });
    const rawReport = new RawReportModel({ raw: JSON.stringify(raw) });
    await rawReport.save();
    report.raw_report_id = rawReport.id;
    await report.save();
}

/**
 * Create html report by report
 * @param {Reports.RawReport} report
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
 * @param {string} id
 * @return {Promise<null|string|string[]>}
 */
export async function createHTMLReportById(id) {
    const report = await RawReportModel.findById(id);
    return getHtmlReport(report.toJSON());
}
