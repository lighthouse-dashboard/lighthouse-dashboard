import { getAllSites } from '../../lib/core/services/site-service';
import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/projects',
    options: {
        description: 'List of projects',
        auth: {
            strategy: 'jwt',
            mode: 'optional',
        },
    },
    handler: async (request, h) => {
        const { isAuthenticated } = request.auth;
        const sites = await getAllSites(100, isAuthenticated);
        return h.view('views/projects.twig', { ...getDefaultParams(request), sites });
    },
};
