import { MEDIUM } from '../../../config/cache';
import { getFavoriteSites } from '../../../services/site-service';
import { siteConfigModelList } from '../schemas/site-config-model';

export default {
    method: 'GET',
    path: '/api/sites/fav',
    handler: () => getFavoriteSites(),
    options: {
        description: 'Get favorited sites',
        tags: ['api', 'sites'],
        auth: 'jwt',
        response: {
            schema: siteConfigModelList,
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
