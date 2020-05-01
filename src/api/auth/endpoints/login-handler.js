import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';
import { loginRequestModel } from '../schemas/login-request-model';

function handler(request) {
    const { password } = request.payload;
    const { LOGIN_PASS, API_SECRET, JWT_SECRET } = process.env;
    if (password === LOGIN_PASS) {
        const jwt = JWT.sign({ token: API_SECRET }, JWT_SECRET);
        return { jwt };
    }
    return Boom.forbidden('Tokens do not match');
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
            payload: loginRequestModel,
        },
    },
};
