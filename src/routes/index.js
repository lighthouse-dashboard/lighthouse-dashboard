import Inert from '@hapi/inert';
import logger from '../../lib/core/src/logger';
import glob from '../utils/glob';
import assetRoutes from './assets-routes';
import viewRoutes from './views-routes';

/**
 * Load all routes
 * @return {Promise<hapi.Route[]>}
 */
async function getRoutes() {
    /** @type {hapi.Route[]} */
    const routes = [
        ...viewRoutes,
        ...assetRoutes,
    ];

    const files = await glob('src/api/**/endpoints/*.js');
    logger.debug(`Loading routes ${ files.length }`);

    return files.reduce((acc, file) => {
        // eslint-disable-next-line global-require
        const { default: route } = require(file);
        acc.push(route);
        return acc;
    }, routes);
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
    logger.info('Loading routes complete');
}
