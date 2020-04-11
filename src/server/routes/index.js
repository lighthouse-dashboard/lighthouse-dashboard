import Inert from '@hapi/inert';
import { dirname } from 'path';
import logger from '../../logger';
import glob from '../../utils/glob';
import defaultRoutes from './routes';

/**
 * Load all routes
 * @return {Promise<hapi.Route[]>}
 */
async function getRoutes() {
    const routes = [
        ...defaultRoutes,
    ];
    const files = await glob('src/api/**/routes.js');
    files.forEach((file) => {
        // eslint-disable-next-line global-require
        const { default: subRoutes } = require(file);
        logger.debug(`Load ${ subRoutes.length } route(s) from ${ dirname(file) }`);
        routes.push(...subRoutes);
    });
    return routes;
}

/**
 * Load all routes
 * @param {hapi.Server} server
 */
export default async function loadRoutes(server) {
    logger.info('Loading routes');
    await server.register(Inert);
    const routes = await getRoutes();
    routes.forEach((route) => {
        server.route(route);
    });
    logger.info('Routes complete');
}
