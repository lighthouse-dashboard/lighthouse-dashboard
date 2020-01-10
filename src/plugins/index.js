import curry from 'lodash.curry';
import { devPlugins, prodPlugins } from './plugins';
import { IS_DEV } from '../utils/env';

/**
 * Register plugins dependent on environment
 * @param {hapi.Server} server
 */
export default async function setupPlugins(server) {
    const register = curry(registerPlugins)(server);
    if (IS_DEV) {
        await register(devPlugins());
    }

    await register(prodPlugins());
}

/**
 * Register a couple of plugins
 * @param {hapi.Server} server
 * @param {[]} plugins - Array of plugins to register
 * @return {Promise<void>}
 */
async function registerPlugins(server, plugins) {
    for (let i = 0; i < plugins.length; i++) {
        await server.register(plugins[i]);
    }
}
