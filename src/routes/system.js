import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/system',
    options: {
        description: 'System view',
        auth: 'jwt',
    },
    handler: (request, h) => {
        return h.view('views/system.twig', getDefaultParams(request));
    },
};
