import uuid from 'uuid/v4';
import {
    addSite,
    getFavoriteSites,
    getLatestSites,
    getSiteConfigById,
    getSites,
    removeSite,
    updateSite,
} from '../../database/sites';

/**
 *
 * @param {hapi.Request} request
 * @return {Promise<void>}
 */
export async function addSiteHandler(request, h) {
    const { url, id, device, isFavorite } = request.payload;
    console.log(isFavorite);
    await addSite({ url, id, device, is_favorite: isFavorite, order: 0, token: uuid() });

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

/**
 *
 * @param {hapi.Request} request
 * @return {Promise<SiteConfig|Boom<null>>}
 */
export async function getSiteByIdHandler(request) {
    const { id } = request.params;
    const config = await getSiteConfigById(id);
    if (!config) {
        return Boom.notFound();
    }
    return config;
}

/**
 *
 * @param {hapi.Request} request
 * @return {Promise<void>}
 */
export async function updateSiteConfigHandler(request, h) {
    const { id } = request.params;
    const { is_favorite } = request.payload;
    await updateSite(id, { is_favorite });
    return h.response().code(204);
}

export const getSitesHandler = () => getSites();
export const getFavSitesHandler = () => getFavoriteSites();
export const getLatestSitesHandler = () => getLatestSites();
