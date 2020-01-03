import uuid from 'uuid/v4';
import { addSite, getFavoriteSites, getLatestSites, getSites, removeSite } from '../../database/sites';

/**
 *
 * @param {hapi.Request} request
 * @return {Promise<void>}
 */
export async function addSiteHandler(request, h) {
    const { url, id, device } = request.payload;
    await addSite({ url, id, device, is_favorite: false, order: 0, token: uuid() });

    return h.response().code(201);
}

/**
 *
 * @param {hapi.Request} request
 * @return {Promise<void>}
 */
export async function deleteSiteHandler(request) {
    const { id } = request.params;
    await removeSite(id);
    return h.response().code(201);
}

export const getSitesHandler = () => getSites();
export const getFavSitesHandler = () => getFavoriteSites();
export const getLatestSitesHandler = () => getLatestSites();
