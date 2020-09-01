import joi from '@hapi/joi';
import { updateSite } from '../../../../lib/core/services/site-service';

/**
 * Update site controller
 * @param {Partial<Sites.SiteModel>} payload
 * @param {object} h
 * @param {object} params
 * @return {Promise<void>}
 */
async function updateSiteConfigHandler({ params, payload }, h) {
    const { id } = params;
    const config = await updateSite(id, payload);

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
            }).label('UpdateSiteParams'),

            payload: joi.object({
                is_favorite: joi.boolean().required(),
                name: joi.string(),
                url: joi.string(),
                is_disabled: joi.boolean(),
                is_public: joi.boolean(),
            }).label('UpdateSitePayload'),
        },
    },
};
