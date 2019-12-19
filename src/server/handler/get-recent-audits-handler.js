import Boom from '@hapi/boom';
import { getAuditsBySiteId } from '../database/get-adits';
import getConfigForPage from '../utils/get-config-for-page';
import getLineDataFromAssets from '../utils/get-line-data-from-asstes';
import normalizeAsset from '../utils/normalize-asset';

/**
 *
 * @param {hapi.Request} request
 * @param h
 * @return {Promise<NormalizedAsset[]>}
 */
export default async function getRecentAuditsHandler(request, h) {
    const { id } = request.params;

    const config = getConfigForPage(id);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const assets = await getAuditsBySiteId(id);
    const normalizedAssets = assets.map(normalizeAsset);
    return getLineDataFromAssets(normalizedAssets);
}
