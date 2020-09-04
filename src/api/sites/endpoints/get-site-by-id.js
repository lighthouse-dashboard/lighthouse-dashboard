import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import { MEDIUM } from '../../../config/cache';
import { getSiteConfigById } from '../../../../lib/shared/services/site-service';
import { getAuthStrategy } from '../../../utils/get-auth-strategy';
import { siteConfigModel } from '../schemas/site-config-model';

/**
 * Get site by id controller
 * @param {object} params
 * @return {Promise<Sites.SiteModel|Boom<null>>}
 */
async function getSiteById({ params }) {
    const { id } = params;
    const config = await getSiteConfigById(id);
    if (!config) {
        return Boom.notFound();
    }
    return config;
}

export default {
    method: 'GET',
    path: '/api/sites/{id}',
    handler: getSiteById,
    options: {
        description: 'Get project config by id',
        tags: ['api', 'sites'],
        auth: getAuthStrategy(),
        validate: {
            params: joi.object({
                id: joi.string().required(),
            }).label('sites.SiteId'),
        },
        response: {
            schema: siteConfigModel,
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
