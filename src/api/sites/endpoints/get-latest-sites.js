import { getLatestSites } from '../../../../lib/core/services/site-service';
import { MEDIUM } from '../../../config/cache';
import { getAuthStrategy } from '../../../utils/get-auth-strategy';
import { siteConfigModelList } from '../schemas/site-config-model';

export const getLatestSitesHandler = (request) => getLatestSites(50, request.auth.isAuthenticated);

export default {
    method: 'GET',
    path: '/api/sites/latest',
    handler: getLatestSitesHandler,
    options: {
        description: 'Get latest audited sites',
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
