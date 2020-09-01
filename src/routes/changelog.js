import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/system/changelog',
    options: {
        description: 'Changelog view',
        auth: {
            strategy: 'jwt',
            mode: 'optional',
        },
    },
    handler: (request, h) => {
        return h.view('views/changelog.twig', getDefaultParams(request));
    },
};
