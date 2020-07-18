import joi from '@hapi/joi';
import { MEDIUM } from '../../../config/cache';
import { findSites, getAllSites } from '../../../models/sites';
import { siteConfigModelList } from '../schemas/site-config-model';

/**
 * Get sites
 * @param {object} query
 * @param {MongodbDecoration} mongo
 * @return {Promise<Sites.SiteModel[]>}
 */
function getSitesHandler({ query, mongo }) {
    const { query: searchQuery } = query;

    if (searchQuery) {
        try {
            return findSites(mongo.db, { $text: { $search: searchQuery } });
        } catch (e) {
            console.log(e);
        }
    }

    return getAllSites(mongo.db);
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
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
