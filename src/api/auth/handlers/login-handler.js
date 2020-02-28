import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';

export function loginHandler(request) {
    const { password } = request.payload;
    if (password === process.env.LOGIN_PASS) {
        return { jwt: JWT.sign({ token: process.env.API_SECRET }, process.env.JWT_SECRET) };
    }
    return Boom.forbidden('Tokens do not match');
}
