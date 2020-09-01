import { MEDIUM } from '../../../config/cache';
import { getFavoriteSites } from '../../../../lib/core/services/site-service';
import { getAuthStrategy } from '../../../utils/get-auth-strategy';
import { siteConfigModelList } from '../schemas/site-config-model';

export default {
    method: 'GET',
    path: '/api/sites/fav',
    handler: () => getFavoriteSites(),
    options: {
        description: 'Get favorited sites',
        tags: ['api', 'sites'],
        auth: getAuthStrategy(),
        response: {
            schema: siteConfigModelList,
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
