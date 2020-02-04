import logger from '../../logger';
import glob from '../../utils/glob';

/**
 * Load all routes
 * @return {Promise<hapi.Route[]>}
 */
export default async function getRoutes() {
    const routes = [];
    const files = await glob('src/api/**/routes.js');
    files.forEach((file) => {
        // eslint-disable-next-line global-require
        const { default: subRoutes } = require(file);
        logger.debug(`Load ${ subRoutes.length } route(s) from ${ file }`);
        routes.push(...subRoutes);
    });
    return routes;
}
