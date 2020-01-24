import uuid from 'uuid/v4';
import { addSite } from '../../database/sites';

/**
 *
 * @param {hapi.Request.Payload} payload
 * @return {Promise<void>}
 */
export default async function addSiteHandler({ payload }, h) {
    const { url, id, device, isFavorite } = payload;
    await addSite({ url, id, device, is_favorite: isFavorite, order: 0, token: uuid() });

    return h.response().code(201);
}
