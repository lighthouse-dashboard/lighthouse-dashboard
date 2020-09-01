import { getDefaultParams } from '../router/utils/get-default-params';
import { getAuthStrategy } from '../utils/get-auth-strategy';

export default {
    method: 'GET',
    path: '/app/system/licenses',
    options: {
        description: 'Licenses view',
        auth: getAuthStrategy(),
    },
    handler: (request, h) => {
        return h.view('views/licenses.twig', getDefaultParams(request));
    },
};
