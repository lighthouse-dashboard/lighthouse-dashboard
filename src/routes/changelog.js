import { getDefaultParams } from '../router/utils/get-default-params';
import { getAuthStrategy } from '../utils/get-auth-strategy';

export default {
    method: 'GET',
    path: '/app/system/changelog',
    options: {
        description: 'Changelog view',
        auth: getAuthStrategy(),
    },
    handler: (request, h) => {
        return h.view('views/changelog.twig', getDefaultParams(request));
    },
};
