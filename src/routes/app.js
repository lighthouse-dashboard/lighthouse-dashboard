import { getAuthStrategy } from '../utils/get-auth-strategy';

export default {
    method: 'GET',
    path: '/app',
    options: {
        description: 'Main entry point',
        auth: getAuthStrategy(),
    },
    handler: (request, h) => {
        return h.redirect('/app/dashboard');
    },
};
