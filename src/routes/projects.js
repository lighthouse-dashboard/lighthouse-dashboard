import { getAllSites } from '../../lib/core/services/site-service';
import { getDefaultParams } from '../router/utils/get-default-params';
import { getAuthStrategy } from '../utils/get-auth-strategy';

export default {
    method: 'GET',
    path: '/app/projects',
    options: {
        description: 'List of projects',
        auth: getAuthStrategy(),
    },
    handler: async (request, h) => {
        const { isAuthenticated } = request.auth;
        const sites = await getAllSites(100, isAuthenticated);
        return h.view('views/projects.twig', { ...getDefaultParams(request), sites });
    },
};
