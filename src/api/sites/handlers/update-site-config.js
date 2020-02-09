import { updateSite } from '../../../database/sites';

/**
 *
 * @param {object} params
 * @param {Partial<SiteConfig>} payload
 * @return {Promise<void>}
 */
export async function updateSiteConfigHandler({ params, payload }, h) {
    const { id } = params;
    const { is_favorite, url, name } = payload;
    const config = await updateSite(id, { is_favorite, url, name });

    return h.response(config).code(204);
}
