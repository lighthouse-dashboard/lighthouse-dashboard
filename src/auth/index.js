import CONFIG from '../../server.config';
import validate from './validate';

export default function(server) {
    server.auth.strategy('jwt', 'jwt', {
        key: CONFIG.API.JWT_SECRET,
        validate,
    });

    server.auth.default('jwt');
}
