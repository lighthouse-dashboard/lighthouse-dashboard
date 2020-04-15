import { updateSite } from '../db/sites';

/**
 * Update site controller
 * @param {Partial<Sites.SiteConfig>} payload
 * @param {object} h
 * @param {object} params
 * @return {Promise<void>}
 */
export async function updateSiteConfigHandler({ params, payload }, h) {
    const { id } = params;
    // eslint-disable-next-line camelcase
    const { is_favorite, url, name } = payload;
    const config = await updateSite(id, { is_favorite, url, name });

    return h.response(config).code(204);
}
