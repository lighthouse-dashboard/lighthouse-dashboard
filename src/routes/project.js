import { getSiteConfigById } from '../models/sites';
import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/projects/{id}',
    options: {
        description: 'Details of project',
        auth: 'jwt',
    },
    handler: async (request, h) => {
        const { id } = request.params;
        const site = await getSiteConfigById(id);
        return h.view('views/project.twig', { ...getDefaultParams(request), site });
    },
};
