import joi from '@hapi/joi';
import { findSites, getAllSites } from '../db/sites';
import { siteConfigModelList } from '../schemas/site-config-model';

/**
 * Get sites
 * @param {object} request
 * @return {Promise<Sites.SiteConfig[]>}
 */
function getSitesHandler(request) {
    const { query } = request.query;

    if (query) {
        try {
            return findSites(request.mongo.db, { $text: { $search: query } });
        } catch (e) {
            console.log(e);
        }
    }

    return getAllSites(request.mongo.db);
}

export default {
    method: 'GET',
    path: '/api/sites',
    handler: getSitesHandler,
    options: {
        auth: 'jwt',
        description: 'Get all configured sites',
        tags: ['api', 'sites'],
        validate: {
            query: joi.object({
                query: joi.string(),
            }).label('sites.Query'),
        },
        response: {
            schema: siteConfigModelList,
        },
    },
};
