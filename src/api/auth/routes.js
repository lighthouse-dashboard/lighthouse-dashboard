import joi from '@hapi/joi';
import { loginHandler } from './handlers/login-handler';

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
                payload: joi.object({
                    password: joi.string().required(),
                },),
            },
        },
    },
];
