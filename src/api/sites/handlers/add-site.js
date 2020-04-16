import uuid from 'uuid/v4';
import { addSite } from '../db/sites';

/**
 * Controller to add a new site
 * @param {hapi.Request.Payload} payload
 * @param {object} h
 * @return {Promise<SiteConfig>}
 */
export default async function addSiteHandler({ payload, mongo }, h) {
    // eslint-disable-next-line camelcase
    const { url, name, device, is_favorite } = payload;
    const config = await addSite(mongo.database, { url, name, device, is_favorite, order: 0, token: uuid() });

    return h.response(config).code(201);
}
