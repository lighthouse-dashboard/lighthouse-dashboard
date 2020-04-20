import uuid from 'uuid/v4';
import { addSite } from '../db/sites';

/**
 * Controller to add a new site
 * @param {hapi.Request} request
 * @param {object} h
 * @return {Promise<Sites.SiteConfig>}
 */
export default async function addSiteHandler(request, h) {
    // eslint-disable-next-line camelcase
    const { url, name, device, is_favorite } = request.payload;
    const config = await addSite(request.mongo.db, { url, name, device, is_favorite, order: 0, token: uuid() });

    return h.response(config).code(201);
}
