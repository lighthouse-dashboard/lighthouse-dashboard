import Boom from '@hapi/boom';
import { getAuditsBySiteId } from '../database/get-adits';
import reportsToChartTransformer from '../transformer/reports-to-chart-transformer';
import getConfigForPage from '../utils/get-config-for-page';

/**
 *
 * @param {hapi.Request} request
 * @param h
 * @return {Promise<Report[]>}
 */
export default async function getRecentAuditsHandler(request) {
    const { id } = request.params;

    const config = getConfigForPage(id);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const assets = await getAuditsBySiteId(id, 10);
    if (!assets || assets.length === 0) {
        return Boom.notFound('No audits found');
    }

    return reportsToChartTransformer(assets);
}
