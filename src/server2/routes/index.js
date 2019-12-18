import routes from './routes';

/**
 *
 * @param {hapi.Server} server
 */
export default function setupRouter(server) {
    routes.map((route) => server.route(route));
}
