import { getFavoriteSites } from '../../../models/sites';
import { siteConfigModelList } from '../schemas/site-config-model';

export default {
    method: 'GET',
    path: '/api/sites/fav',
    handler: (request) => getFavoriteSites(request.mongo.db),
    options: {
        description: 'Get favorited sites',
        tags: ['api', 'sites'],
        auth: 'jwt',
        response: {
            schema: siteConfigModelList,
        },
    },
};
