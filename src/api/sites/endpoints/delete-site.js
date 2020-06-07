import joi from '@hapi/joi';
import { removeSite } from '../db/sites';

/**
 * Delete site from DB
 * @param {object} params
 * @param {MongodbDecoration} mongo
 * @param {object} h
 * @return {Promise<void>}
 */
async function deleteSite({ params, mongo }, h) {
    const { id } = params;
    await removeSite(mongo.db, id);
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
