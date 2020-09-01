import { MEDIUM } from '../../../config/cache';
import { getFavoriteSites } from '../../../../lib/core/services/site-service';
import { siteConfigModelList } from '../schemas/site-config-model';

export default {
    method: 'GET',
    path: '/api/sites/fav',
    handler: () => getFavoriteSites(),
    options: {
        description: 'Get favorited sites',
        tags: ['api', 'sites'],
        auth: {
            strategy: 'jwt',
            mode: 'optional',
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
