import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';
import CONFIG from '../../../dashboard.config';


export function loginHandler(request) {
    const { password } = request.payload;
    if (password === CONFIG.SERVER.API.LOGIN_PASS) {
        return { jwt: JWT.sign({ token: CONFIG.SERVER.API.LOGIN_PASS }, CONFIG.SERVER.API.JWT_SECRET) };
    }
    return Boom.forbidden('Tokens do not match');
}
