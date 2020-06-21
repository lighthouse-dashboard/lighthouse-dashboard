import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/dashboard',
    options: {
        description: 'Dashboard page',
        auth: 'jwt',
    },
    handler: (request, h) => {
        return h.view('views/dashboard.twig', getDefaultParams(request));
    },
};
