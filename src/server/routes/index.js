import getRoutes from './routes';

/**
 * Load all routes
 * @param {hapi.Server} server
 */
export default async function loadRoutes(server) {
    const routes = await getRoutes();
    routes.forEach((route) => {
        server.route(route);
    });
}
