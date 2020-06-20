import { getLatestSites } from '../../../services/models/sites';
import CONFIG from '../../../../config/server';
import { siteConfigModelList } from '../schemas/site-config-model';

export const getLatestSitesHandler = (request) => getLatestSites(request.mongo.db, CONFIG.api.entriesLimit);

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
