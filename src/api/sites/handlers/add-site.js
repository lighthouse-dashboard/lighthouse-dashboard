import uuid from 'uuid/v4';
import { addSite } from '../../../database/sites';

/**
 * Controller to add a new site
 * @param {hapi.Request.Payload} payload
 * @param {object} h
 * @return {Promise<SiteConfig>}
 */
export default async function addSiteHandler({ payload }, h) {
    const { url, name, device, isFavorite } = payload;
    const config = await addSite({ url, name, device, isFavorite, order: 0, token: uuid() });

    return h.response(config).code(201);
}
