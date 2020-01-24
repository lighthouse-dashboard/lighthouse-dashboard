import { updateSite } from '../../database/sites';

/**
 *
 * @param {hapi.Request} request
 * @return {Promise<void>}
 */
export async function updateSiteConfigHandler({ params, payload }, h) {
    const { id } = params;
    const { is_favorite } = payload;
    await updateSite(id, { is_favorite });
    return h.response().code(204);
}
