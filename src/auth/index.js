import CONFIG from '../../dashboard.config';
import validate from './validate';

export default function(server) {
    server.auth.strategy('jwt', 'jwt', {
        key: CONFIG.SERVER.API.JWT_SECRET,
        validate,
    });

    server.auth.default('jwt');
}
