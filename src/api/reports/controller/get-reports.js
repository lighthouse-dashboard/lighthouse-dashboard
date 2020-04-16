import Boom from '@hapi/boom';
import CONFIG from '../../../../config/server';
import { getSiteConfigById } from '../../sites/db/sites';
import { getReportsBySiteId } from '../db/reports';

/**
 * Handler for latest created reports
 * @param {hapi.Request.params} params
 * @return {Promise<Report[]>}
 */
export default async function getReports({ params, mongo }) {
    const { id } = params;

    const config = getSiteConfigById(mongo.db, id);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const assets = await getReportsBySiteId(mongo.db, id, CONFIG.API.SITE_REPORT_LIMIT);
    if (!assets || assets.length === 0) {
        return Boom.notFound('No audits found');
    }

    return assets.map((report) => {
        report.hasRawData = !!report.raw;
        report.raw = null;
        return report;
    });
}
