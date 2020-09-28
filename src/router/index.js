import Inert from '@hapi/inert';
import logger from '../../lib/logger';
import glob from '../utils/glob';
import assetRoutes from './routes/assets';

/**
 * Load all route objects form given file pattern
 * @param {string} pattern
 * @return {Promise<*[]>}
 */
async function loadAllRoutesFor(pattern) {
    const files = await glob(pattern);
    logger.debug(`Loading routes ${ files.length }`);

    return files.reduce((acc, file) => {
        // eslint-disable-next-line global-require
        const { default: route } = require(file);
        acc.push(route);
        return acc;
    }, []);
}

/**
 * Load all routes
 * @return {Promise<hapi.Route[]>}
 */
async function getRoutes() {
    /** @type {hapi.Route[]} */
    return [
        ...assetRoutes,
        ...(await loadAllRoutesFor('src/api/**/endpoints/**/index.js')),
        ...(await loadAllRoutesFor('src/api/**/endpoints/*.js')),
        ...(await loadAllRoutesFor('src/routes/**/*.js')),
    ];
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
