'use strict';
require('dotenv').config();


import Hapi from '@hapi/hapi';
import { join } from 'path';
import logger from './utils/logger';
import { IS_DEV } from './utils/env';
import setupCronjobs from './cronjobs';
import setupPlugins from './plugins';
import setupRouter from './routes';

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || '0.0.0.0',
        routes: {
            cors: true,
            files: {
                relativeTo: join(__dirname, '../../assets'),
            },
        },
    });

    if (!IS_DEV) {
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
