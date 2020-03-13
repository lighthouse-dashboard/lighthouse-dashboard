import Boom from '@hapi/boom';
import CONFIG from '../../../../config/server';
import { getReportsBySiteId } from '../../../database/reports';
import { getSiteConfigById } from '../../../database/sites';

/**
 * Handler for latest created reports
 * @param {hapi.Request.params} params
 * @return {Promise<ChartData>}
 */
export default async function getReports({ params }) {
    const { id } = params;

    const config = getSiteConfigById(id);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const assets = await getReportsBySiteId(id, CONFIG.API.SITE_REPORT_LIMIT);
    if (!assets || assets.length === 0) {
        return Boom.notFound('No audits found');
    }

    return assets.map((report) => {
        report.hasRawData = !!report.raw;
        report.raw = null;
        return report;
    });
}
