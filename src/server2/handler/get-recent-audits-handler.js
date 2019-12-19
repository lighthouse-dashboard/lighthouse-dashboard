import { getAuditsByName } from '../database/get-adits';
import getLineDataFromAssets from '../utils/get-line-data-from-asstes';
import normalizeAsset from '../utils/normalize-asset';

/**
 *
 * @param {hapi.Request} request
 * @param h
 * @return {Promise<NormalizedAsset[]>}
 */
export default async function getRecentAuditsHandler(request, h) {
    const { asset } = request.params;

    const assets = await getAuditsByName(asset);
    const normalizedAssets = assets.map(normalizeAsset);
    return getLineDataFromAssets(normalizedAssets);
}
