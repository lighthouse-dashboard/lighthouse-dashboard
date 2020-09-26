import { getScheduledSites } from '../../lib/shared/services/site-service';
import { getDefaultParams } from '../router/utils/get-default-params';
import { getAuthStrategy } from '../utils/get-auth-strategy';

export default {
    method: 'GET',
    path: '/app/queue',
    options: {
        description: 'Dashboard page',
        auth: getAuthStrategy(),
    },
    handler: async (request, h) => {
        const { isAuthenticated } = request.auth;
        const scheduledSites = (await getScheduledSites(20, isAuthenticated));
        return h.view('views/queue.twig', { ...getDefaultParams(request), scheduledSites });
    },
};
