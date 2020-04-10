import { loginHandler } from './handlers/login-handler';
import { loginRequestModel } from './schemas/login-request-model';

export default [
    {
        method: 'POST',
        path: '/api/auth',
        handler: loginHandler,
        options: {
            auth: false,
            description: 'Get JWT token',
            tags: ['api', 'auth'],
            validate: {
                payload: loginRequestModel,
            },
        },
    },
];
