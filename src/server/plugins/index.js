import logger from '../../../lib/logger';
import getPlugins from './plugins';

/**
 * Install plugins
 * @param {hapi.Server} server
 * @param {object[]} plugins array of plugins to install
 * @return {Promise<void>}
 */
async function registerPlugins(server, plugins) {
    for (let i = 0; i < plugins.length; i++) {
        logger.debug(`Registering plugin ${ i }`);
        await server.register(plugins[i]);
        logger.debug(`Registering complete`);
    }
}

/**
 * Register required plugins depending on the env
 * @param {hapi.Server} server
 * @return {Promise<void>}
 */
export default async function loadPlugins(server) {
    logger.info('Loading plugins');

    const { prod, dev } = getPlugins();

    logger.debug(`Register ${ prod.length } prod plugins`);
    await registerPlugins(server, prod);

    if (process.env.NODE_ENV === 'development') {
        logger.debug(`Register ${ dev.length } dev plugins`);
        await registerPlugins(server, dev);
    }

    logger.info('Plugins complete');
}
