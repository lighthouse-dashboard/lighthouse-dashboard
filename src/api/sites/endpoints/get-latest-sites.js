import { getLatestSites } from '../db/sites';
import { siteConfigModelList } from '../schemas/site-config-model';

export const getLatestSitesHandler = (request) => getLatestSites(request.mongo.db);

export default {
    method: 'GET',
    path: '/api/sites/latest',
    handler: getLatestSitesHandler,
    options: {
        description: 'Get latest audited sites',
        tags: ['api', 'sites'],
        auth: 'jwt',
        response: {
            schema: siteConfigModelList,
        },
    },
};
