import routes from './routes';

/**
 *
 * @param {hapi.Server} server
 */
export default function setupRouter(server) {
    routes.forEach((route) => {
        server.route(route);
        console.log(`Route`, route.method, route.path)
    });
}
