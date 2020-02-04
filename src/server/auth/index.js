import CONFIG from '../../../server.config';
import validate from './validate';

/**
 * Setup auth for server
 * @param {Hapi.Server} server
 */
export default function setupAuth(server) {
    server.auth.strategy('jwt', 'jwt', {
        key: CONFIG.API.JWT_SECRET,
        validate,
    });

    server.auth.default('jwt');
};
