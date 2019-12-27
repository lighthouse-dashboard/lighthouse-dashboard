import Boom from '@hapi/boom';
import { REPORT_AUDIT_KEYS } from '../../../../config/audit';
import CONFIG from '../../../../dashboard.config';
import { getLatestReportBySiteId, getReportsBySiteId } from '../../database/reports';
import { getFavoriteSites, getSiteConfigById } from '../../database/sites';
import reportsToChartTransformer from '../../transformer/reports-to-chart-transformer';
import createLighthouseReport from '../../utils/create-lighthouse-report';
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
export async function createReportHandler(request) {
    const { id } = request.params;
    const config = await getSiteConfigById(id);
    if (!config) {
        return Boom.notFound('Config not found');
    }
    const data = await createLighthouseReport(config);
    return data;
}

/**
 * Get overview over projects by specific timing id
 * @return {Promise<{datasets: [], labels: []}>}
 */
export async function getSpeedReportOverviewHandler() {
    const data = { labels: [], datasets: [] };

    const pages = await getFavoriteSites();
    data.labels = pages.map((p) => p.id);
    const exportingValues = [
        REPORT_AUDIT_KEYS.PERFORMANCE,
    ];

    for (let i = 0; i < exportingValues.length; i++) {
        const values = [];
        for (let p = 0; p < pages.length; p++) {
            const audit = await getLatestReportBySiteId(pages[p].id);
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
