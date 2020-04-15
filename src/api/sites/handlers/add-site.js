import uuid from 'uuid/v4';
import { addSite } from '../db/sites';

/**
 * Controller to add a new site
 * @param {hapi.Request.Payload} payload
 * @param {object} h
 * @return {Promise<Sites.SiteConfig>}
 */
export default async function addSiteHandler({ payload }, h) {
    // eslint-disable-next-line camelcase
    const { url, name, device, is_favorite } = payload;
    const config = await addSite({ url, name, device, is_favorite, order: 0, token: uuid() });

    return h.response(config).code(201);
}
