import joi from '@hapi/joi';
import { addSite } from '../../../../lib/shared/services/site-service';

/**
 * Controller to add a new site
 * @param {object} payload
 * @param {object} h
 * @return {Promise<Sites.SiteModel>}
 */
async function addSiteHandler({ payload }, h) {
    // eslint-disable-next-line camelcase
    const { url, name, device, is_favorite } = payload;
    const config = await addSite({ url, name, device, is_favorite, order: 0,  });

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
                is_disabled: joi.boolean(),
                is_public: joi.boolean().optional(),
                device: joi
                    .string()
                    .allow('desktop', 'mobile'),
                is_favorite: joi.boolean(),
            }).label('CreateSitePayload'),
        },
    },
};
