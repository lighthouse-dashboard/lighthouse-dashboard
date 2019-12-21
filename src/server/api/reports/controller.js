import Boom from '@hapi/boom';
import curry from 'lodash.curry';
import { REPORT_AUDIT_KEYS } from '../../../../config/audit';
import PAGES from '../../../../config/sites';
import runLighthouse from '../../audit/run-lighthouse';
import { getLatestReportBySiteId, getReportsBySiteId, saveReport } from '../../database/reports';
import { getSiteConfigById } from '../../database/sites';
import lighthouseTransformer from '../../transformer/lighthouse-transformer';
import reportsToChartTransformer from '../../transformer/reports-to-chart-transformer';
import { getTimingValueByKey } from '../../utils/get-timing-by-key';

/**
 *
 * @param {hapi.Request} request
 * @param h
 * @return {Promise<Report[]>}
 */
export async function getRecentReportsHandler(request) {
    const { id } = request.params;

    const config = getSiteConfigById(id);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const assets = await getReportsBySiteId(id, 100);
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
export async function createReportHandler(request) {
    const { id } = request.params;
    const { message } = request.query;
    const config = await getSiteConfigById(id);
    if (!config) {
        return Boom.notFound('Config not found');
    }
    const { url, runs, device } = config;
    debugger;

    const transformAuditCurry = curry(lighthouseTransformer);
    const data = await runLighthouse({ pageUrl: url, runs, device }, transformAuditCurry(id));

    await saveReport({ ...data, message });
    return data;
}

/**
 * Get overview over projects by specific timing id
 * @return {Promise<{datasets: [], labels: []}>}
 */
export async function getSpeedReportOverviewHandler() {
    const data = { labels: [], datasets: [] };

    data.labels = PAGES.map((p) => p.url);
    const exportingValues = [
        REPORT_AUDIT_KEYS.PERFORMANCE,
    ];

    for (let i = 0; i < exportingValues.length; i++) {
        const values = [];
        for (let p = 0; p < PAGES.length; p++) {
            const audit = await getLatestReportBySiteId(PAGES[p].id);
            if (!audit) {
                continue;
            }

            const value = audit ? getTimingValueByKey(audit.values, exportingValues[i]) : null;
            values.push(value);
        }

        data.datasets.push({
            name: exportingValues[i],
            data: values,
        });
    }

    return data;
}
