import { updateSite } from '../../../database/sites';

/**
 * Update site controller
 * @param {Partial<SiteConfig>} payload
 * @param {object} h
 * @param {object} params
 * @return {Promise<void>}
 */
export async function updateSiteConfigHandler({ params, payload }, h) {
    const { id } = params;
    const { isFavorite, url, name } = payload;
    const config = await updateSite(id, { isFavorite, url, name });

    return h.response(config).code(204);
}
