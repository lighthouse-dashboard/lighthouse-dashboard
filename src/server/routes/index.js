import { info } from '../utils/logger';
import routes from './routes';

/**
 * Register all routes on server
 * @param {hapi.Server} server
 */
export default function setupRouter(server) {
    routes.forEach((route) => {
        server.route(route);
        info(`Route`, route.method, route.path);
    });
}
