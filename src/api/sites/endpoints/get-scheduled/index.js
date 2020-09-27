import { getScheduledSites } from '../../../../../lib/shared/services/site-service';
import { getAuthStrategy } from '../../../../utils/get-auth-strategy';
import GetScheduledResponseSchema from './schema';

/**
 * Get sites
 * @param {hapi.Request} request
 * @return {Promise<GetScheduledApi.Response[]>}
 */
const getScheduledSitesHandler = async (request) => {
    const r = await getScheduledSites(100, request.auth.isAuthenticated);
    return r.map((site) => ({
        _id: site._id,
        name: site.name,
        url: site.url,
    }));
};

export default {
    method: 'GET',
    path: '/api/sites/scheduled',
    handler: getScheduledSitesHandler,
    options: {
        description: 'Get all scheduled sites',
        tags: ['api', 'sites'],
        auth: getAuthStrategy(),
        response: {
            schema: GetScheduledResponseSchema,
        },
    },
};
