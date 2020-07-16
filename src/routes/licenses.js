import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/system/licenses',
    options: {
        description: 'Licenses view',
        auth: 'jwt',
    },
    handler: (request, h) => {
        return h.view('views/licenses.twig', getDefaultParams(request));
    },
};
