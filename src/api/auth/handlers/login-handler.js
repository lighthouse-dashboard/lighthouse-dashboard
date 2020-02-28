import Boom from '@hapi/boom';
import JWT from 'jsonwebtoken';

export function loginHandler(request) {
    const { password } = request.payload;
    const { LOGIN_PASS, API_SECRET, JWT_SECRET } = process.env;
    if (password === LOGIN_PASS) {
        const jwt = JWT.sign({ token: API_SECRET }, JWT_SECRET);
        return { jwt };
    }
    return Boom.forbidden('Tokens do not match');
}
