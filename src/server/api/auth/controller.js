import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';
import CONFIG from '../../../../dashboard.config';


export function loginHandler(request) {
    const { password } = request.payload;
    console.log(password, CONFIG.SERVER.API.AUTH_TOKEN);
    if (password === CONFIG.SERVER.API.AUTH_TOKEN) {
        return { jwt: JWT.sign({ token: CONFIG.SERVER.API.AUTH_TOKEN }, CONFIG.SERVER.API.JWT_SECRET) };
    }
    return Boom.forbidden('Tokens do not match');
}
