import getLineDataFromAssets from '../utils/get-line-data-from-asstes';
import getRecentBuilds from '../provider/get-recent-builds';
import normalizeAsset from '../utils/normalize-asset';

/**
 *
 * @param {hapi.Request} request
 * @param h
 * @return {Promise<NormalizedAsset[]>}
 */
export default async function getRecentAuditsHandler(request, h) {
    const { asset } = request.params;

    const assets = await getRecentBuilds(asset, 5);
    const normalizedAssets = assets.map(normalizeAsset);
    return getLineDataFromAssets(normalizedAssets);
}
