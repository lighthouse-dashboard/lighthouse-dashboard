import logger from '../../../lib/core/logger';
import { IS_DEV } from '../../utils/env';
import PLUGINS from './plugins';

/**
 * Install plugins
 * @param {hapi.Server} server
 * @param {object[]} plugins array of plugins to install
 * @return {Promise<void>}
 */
async function registerPlugins(server, plugins) {
    for (let i = 0; i < plugins.length; i++) {
        await server.register(plugins[i]);
    }
}

/**
 * Register required plugins depending on the env
 * @param {hapi.Server} server
 * @return {Promise<void>}
 */
export default async function loadPlugins(server) {
    logger.info('Loading plugins');

    logger.debug(`Register ${ PLUGINS.prod.length } prod plugins`);
    await registerPlugins(server, PLUGINS.prod);

    if (IS_DEV) {
        logger.debug(`Register ${ PLUGINS.dev.length } dev plugins`);
        await registerPlugins(server, PLUGINS.dev);
    }

    logger.info('Plugins complete');
}
