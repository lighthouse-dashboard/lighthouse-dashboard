import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';
import CONFIG from '../../../../server.config';


export function loginHandler(request) {
    const { password } = request.payload;
    if (password === CONFIG.API.LOGIN_PASS) {
        return { jwt: JWT.sign({ token: CONFIG.API.LOGIN_PASS }, CONFIG.API.JWT_SECRET) };
    }
    return Boom.forbidden('Tokens do not match');
}
