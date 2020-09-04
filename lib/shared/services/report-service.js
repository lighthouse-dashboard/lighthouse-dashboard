import mongoose from 'mongoose';
import logger from '../../logger';
import { RawReportModel } from '../models/raw-report-model';
import { ReportModel } from '../models/report-model';

const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');

/**
 * Get latest report for site
 * @param {string} id
 * @return {Promise<Reports.Report | null>}
 */
export async function getLatestReportBySiteId(id) {
    const report = await ReportModel.findOne({ site: new mongoose.Types.ObjectId(id) }).sort({ createdAt: -1 });
    if (!report) {
        return null;
    }
    return report.toJSON();
}

/**
 * Get all reports for site id
 * @param {string} id
 * @param {number} limit
 * @return {Promise<Reports.Report[]>}
 */
export async function getReportsBySiteId(id, limit) {
    const models = await ReportModel
        .find({ site: new mongoose.Types.ObjectId(id) })
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('site')
    return models.map(report => report.toJSON());
}

/**
 * Save a new report in DB
 * @param {Reports.Report} reportData
 * @param {object} raw - raw lighthouse audit report
 */
export async function saveReport(reportData, raw) {
    logger.debug('Save new report');
    const rawReport = new RawReportModel({ raw: JSON.stringify(raw) });
    const report = new ReportModel({ ...reportData, raw_report: rawReport });
    await rawReport.save();
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
    if (!report) {
        return null;
    }
    return getHtmlReport(report.toJSON());
}
