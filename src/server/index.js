'use strict';

import Hapi from '@hapi/hapi';
import { join } from 'path';
import CONFIG from '../../dashboard.config';
import auth from './auth';
import setupPlugins from './plugins';
import setupRouter from './routes';
import { IS_DEV } from './utils/env';
import logger from './utils/logger';
import configValidator from './validator/config-validator';
import configSchema from './validator/schemas/config-schema';

const init = async () => {
    const server = Hapi.server({
        port: CONFIG.SERVER.PORT,
        host: CONFIG.SERVER.HOST,
        routes: {
            cors: true,
            files: {
                // path from where the static assets should be served
                relativeTo: join(__dirname, '../../assets'),
            },
        },
    });

    await setupPlugins(server);

    // Only require JWT auth in production
    if (!IS_DEV) {
        server.auth.strategy('jwt', 'jwt', {
            key: CONFIG.SERVER.API.JWT_SECRET,
            validate: auth,
        });

        server.auth.default('jwt');
    }

    setupRouter(server);
    await server.start();
    logger('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

if (configValidator(configSchema, CONFIG)) {
    init();
}
