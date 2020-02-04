import routes from '../routes/routes';

/**
 * Register all routes on server
 * @param {hapi.Server} server
 */
export default function setupRouter(server) {
    routes.forEach((route) => {
        server.route(route);
    });
}
