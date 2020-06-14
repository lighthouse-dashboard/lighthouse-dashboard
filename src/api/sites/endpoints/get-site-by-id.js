import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import { getSiteConfigById } from '../../../../lib/core/db/models/sites';
import { siteConfigModel } from '../schemas/site-config-model';

/**
 * Get site by id controller
 * @param {object} params
 * @param {MongodbDecoration} mongo
 * @return {Promise<Sites.SiteConfig|Boom<null>>}
 */
async function getSiteById({ params, mongo }) {
    const { id } = params;
    const config = await getSiteConfigById(mongo.db, id);
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
        auth: 'jwt',
        validate: {
            params: joi.object({
                id: joi.string().required(),
            }).label('sites.SiteId'),
        },
        response: {
            schema: siteConfigModel,
        },
    },
};
