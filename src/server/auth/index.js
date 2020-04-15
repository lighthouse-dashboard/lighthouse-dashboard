import jwt from 'hapi-auth-jwt2';
import logger from '../../logger';
import validate from './validate';

/**
 * Setup auth for server
 * @param {Server} server
 */
export default async function setupAuth(server) {
    logger.info('Loading auth');

    await server.register(jwt);
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validate,
    });

    server.auth.default('jwt');
    logger.info('Auth complete');
};
