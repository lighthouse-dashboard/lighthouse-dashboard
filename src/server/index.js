'use strict';

import Hapi from '@hapi/hapi';
import { join } from 'path';
import { IS_DEV } from './utils/env';
import CONFIG from '../../dashboard.config';
import auth from './auth';
import setupPlugins from './plugins';
import setupRouter from './routes';
import logger from './utils/logger';

const init = async () => {
    const server = Hapi.server({
        port: CONFIG.SERVER.PORT,
        host: CONFIG.SERVER.HOST,
        routes: {
            cors: true,
            files: {
                relativeTo: join(__dirname, '../../assets'),
            },
        },
    });

    await setupPlugins(server);

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

init();
