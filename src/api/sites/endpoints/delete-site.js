import joi from '@hapi/joi';
import { removeSite } from '../../../../lib/core/services/site-service';

/**
 * Delete site from DB
 * @param {object} params
 * @param {object} h
 * @return {Promise<void>}
 */
async function deleteSite({ params }, h) {
    const { id } = params;
    await removeSite(id);
    return h.response().code(201);
}

export default {
    method: 'DELETE',
    path: '/api/sites/{id}',
    handler: deleteSite,
    options: {
        description: 'Delete site',
        tags: ['api', 'sites'],
        auth: 'jwt',
        validate: {
            params: joi.object({
                id: joi.string().required(),
            }).label('sites.SiteId'),
        },
    },
};
