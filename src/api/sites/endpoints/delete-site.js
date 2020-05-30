import joi from '@hapi/joi';
import { removeSite } from '../db/sites';

/**
 * Delete site from DB
 * @param {hapi.Request} request
 * @param {object} h
 * @return {Promise<void>}
 */
async function deleteSite(request, h) {
    const { id } = request.params;
    await removeSite(request.mongo.db, id);
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
