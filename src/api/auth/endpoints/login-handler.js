import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import loginService from '../../../services/login-service';

function handler(request) {
    const { password } = request.payload;
    const result = loginService(password);
    if (!result) {
        return Boom.forbidden('Tokens do not match');
    }

    return result;
}

export default {
    method: 'POST',
    path: '/api/auth',
    handler: handler,
    options: {
        auth: false,
        description: 'Get JWT token',
        tags: ['api', 'auth'],
        validate: {
            payload: joi.object({
                password: joi.string().required(),
            }).label('PostAuthPayload'),
        },
    },
};
