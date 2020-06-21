import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/projects',
    options: {
        description: 'List of projects',
        auth: 'jwt',
    },
    handler: (request, h) => {
        return h.view('views/projects.twig', getDefaultParams(request));
    },
};
