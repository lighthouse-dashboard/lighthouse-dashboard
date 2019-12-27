'use strict';

import Hapi from '@hapi/hapi';
import AuthBearer from 'hapi-auth-bearer-token';
import { join } from 'path';
import CONFIG from '../../dashboard.config';
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

    await server.register(AuthBearer);

    server.auth.strategy('simple', 'bearer-access-token', {
        allowQueryToken: true,
        validate: (request, token) => {
            const isValid = token === CONFIG.SERVER.API.AUTH_TOKEN;
            const credentials = { token };
            return { isValid, credentials };
        },
    });

    server.auth.default('simple');


    if (!IS_DEV && CONFIG.SERVER.CRONJOB.ENABLED) {
        await setupCronjobs();
    }
    await setupPlugins(server);
    setupRouter(server);

    await server.start();
    logger('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
