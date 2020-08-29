import { getAllSites } from '../../lib/core/services/site-service';
import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/projects',
    options: {
        description: 'List of projects',
        auth: 'jwt',
    },
    handler: async (request, h) => {
        const sites = await getAllSites();
        return h.view('views/projects.twig', { ...getDefaultParams(request), sites });
    },
};
