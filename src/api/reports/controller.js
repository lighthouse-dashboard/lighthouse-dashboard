import Boom from '@hapi/boom';
import curry from 'lodash.curry';
import CONFIG from '../../../dashboard.config';
import runLighthouse from '../../audit/run-lighthouse';
import { getLatestReportBySiteId, getReportsBySiteId, saveReport } from '../../database/reports';
import { getFavoriteSites, getSiteConfigById, updateSite } from '../../database/sites';
import lighthouseTransformer from '../../transformer/lighthouse-transformer';
import reportsToBarChart from '../../transformer/reports-to-bar-cahrt';
import reportsToChartTransformer from '../../transformer/reports-to-chart-transformer';
import { getTimingValueByKey } from '../../utils/get-timing-by-key';
import { error } from '../../utils/logger';

/**
 *
 * @param {hapi.Request} request
 * @param h
 * @return {Promise<ChartData>}
 */
export async function getRecentReportsHandler(request) {
    const { id } = request.params;

    const config = getSiteConfigById(id);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const assets = await getReportsBySiteId(id, CONFIG.SERVER.API.SITE_REPORT_LIMIT);
    if (!assets || assets.length === 0) {
        return Boom.notFound('No audits found');
    }

    return reportsToChartTransformer(assets);
}

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @return {Promise<AuditDocument>}
 */
export async function createReportHandler(request, h) {
    const { id } = request.params;
    const { token } = request.payload;
    const config = await getSiteConfigById(id);
    if (!config) {
        return Boom.notFound('Config not found');
    }

    if (config.token !== token) {
        return Boom.forbidden('Token mismatch');
    }
    const { url, runs, device } = config;

    try {
        const transformAuditCurry = curry(lighthouseTransformer);
        const data = await runLighthouse({ pageUrl: url, runs, device }, transformAuditCurry(id));
        await saveReport(data);
        await updateSite(config.id, { last_audit: new Date().toISOString() });
    } catch (e) {
        error(e);
        return Boom.boomify(e);
    }

    return h.response().code(201);
}

/**
 * Get overview over projects by specific timing id
 * @return {Promise<ChartData>}
 */
export async function getSpeedReportOverviewHandler() {
    const pages = await getFavoriteSites();
    const labels = pages.map((p) => p.id);

    const reports = [];
    for (let p = 0; p < pages.length; p++) {
        const report = await getLatestReportBySiteId(pages[p].id);
        if (!report) {
            continue;
        }
        reports.push(report);
    }

    return reportsToBarChart(reports, labels, CONFIG.DASHBOARD.OVERVIEW_BAR_VALUES);
}

/**
 *
 * @param {hapi.Request} request
 * @return {Promise<void>}
 */
export async function getLatestReportValuesHandler(request) {
    const { id } = request.params;

    const config = getSiteConfigById(id);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const report = await getLatestReportBySiteId(id);
    const values = CONFIG.DASHBOARD.LATEST_REPORTS_VALUES;

    return {
        labels: values,
        series: values.map(vid => getTimingValueByKey(report.values, vid)),
    };
}
