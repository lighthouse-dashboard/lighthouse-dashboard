import { getScheduledSites } from '../../../services/sites-service';
import { siteConfigModelList } from '../schemas/site-config-model';

/**
 * Get sites
 * @param {object} query
 * @param {MongodbDecoration} mongo
 * @return {Promise<Sites.SiteModel[]>}
 */
function getScheduledSitesHandler({ mongo }) {
    return getScheduledSites(mongo.db);
}

export default {
    method: 'GET',
    path: '/api/sites/scheduled',
    handler: getScheduledSitesHandler,
    options: {
        auth: 'jwt',
        description: 'Get all scheduled sites',
        tags: ['api', 'sites'],
        response: {
            schema: siteConfigModelList,
        },
    },
};
