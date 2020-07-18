import joi from '@hapi/joi';
import { updateSite } from '../../../models/sites';

/**
 * Update site controller
 * @param {Partial<Sites.SiteModel>} payload
 * @param {object} h
 * @param {object} params
 * @param {MongodbDecoration} mongo
 * @return {Promise<void>}
 */
async function updateSiteConfigHandler({ params, payload, mongo }, h) {
    const { id } = params;
    // eslint-disable-next-line camelcase
    const { is_favorite, url, name } = payload;
    const config = await updateSite(id, { is_favorite, url, name });

    return h.response(config);
}

export default {
    method: 'PUT',
    path: '/api/sites/{id}',
    handler: updateSiteConfigHandler,
    options: {
        description: 'Get project config by id',
        tags: ['api', 'sites'],
        auth: 'jwt',
        validate: {
            params: joi.object({
                id: joi.string().required(),
            }).label('sites.SiteId'),
            payload: joi.object({
                is_favorite: joi.boolean().required(),
                name: joi.string(),
                url: joi.string(),
                disabled: joi.boolean(),
            }).label('sites.SiteUpdateModel'),
        },
    },
};
