import joi from '@hapi/joi';
import uuid from 'uuid/v4';
import { addSite } from '../db/sites';

/**
 * Controller to add a new site
 * @param {hapi.Request} request
 * @param {object} h
 * @return {Promise<Sites.SiteConfig>}
 */
async function addSiteHandler(request, h) {
    // eslint-disable-next-line camelcase
    const { url, name, device, is_favorite } = request.payload;
    const config = await addSite(request.mongo.db, { url, name, device, is_favorite, order: 0, token: uuid() });

    return h.response(config).code(201);
}

export default {
    method: 'POST',
    path: '/api/sites',
    handler: addSiteHandler,
    options: {
        description: 'Add new site configuration',
        tags: ['api', 'sites'],
        auth: 'jwt',
        validate: {
            payload: joi.object({
                url: joi
                    .string(),
                name: joi
                    .string(),
                device: joi
                    .string()
                    .allow('desktop', 'mobile'),
                is_favorite: joi.boolean(),
            }).label('sites.CreateSiteModel'),
        },
    },
};
