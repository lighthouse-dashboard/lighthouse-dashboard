'use strict';

import Hapi from '@hapi/hapi';
import AuthBearer from 'hapi-auth-bearer-token';
import { join } from 'path';
import CONFIG from '../../dashboard.config';
import auth from './auth';
import setupCronjobs from './cronjobs';
import setupPlugins from './plugins';
import setupRouter from './routes';
import { IS_DEV } from './utils/env';
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


    if (!IS_DEV && CONFIG.SERVER.CRONJOB.ENABLED) {
        await setupCronjobs();
    }
    await setupPlugins(server);

    server.auth.strategy('jwt', 'jwt', {
        key: CONFIG.SERVER.API.JWT_SECRET,
        validate: auth,
    });

    server.auth.default('jwt');

    setupRouter(server);
    await server.start();
    logger('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
