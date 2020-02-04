import JWT from 'hapi-auth-jwt2';
import CONFIG from '../../../server.config';
import validate from './validate';

/**
 * Setup auth for server
 * @param {Hapi.Server} server
 */
export default async function setupAuth(server) {
    await server.register(JWT);
    server.auth.strategy('jwt', 'jwt', {
        key: CONFIG.API.JWT_SECRET,
        validate,
    });

    server.auth.default('jwt');
};
