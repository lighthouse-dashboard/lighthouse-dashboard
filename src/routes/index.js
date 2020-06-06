import Inert from '@hapi/inert';
import logger from '../logger';
import glob from '../utils/glob';
import viewRoutes from './views-routes';
import assetRoutes from './assets-routes';

/**
 * Load all routes
 * @return {Promise<hapi.Route[]>}
 */
async function getRoutes() {
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
