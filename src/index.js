'use strict';

import Hapi from '@hapi/hapi';
import { join } from 'path';
import CONFIG from '../dashboard.config.js';
import setupAuth from './auth/';
import setupPlugins from './plugins';
import setupRouter from './routes';
import logger from './utils/logger';
import configValidator from './validator/config-validator';
import configSchema from './validator/schemas/config-schema';

if (process.env.SENTRY_DSN) {
    const Sentry = require('@sentry/node');
    Sentry.init({ dsn: process.env.SENTRY_DSN });
}

const init = async () => {
    const server = Hapi.server({
        port: CONFIG.SERVER.PORT,
        host: CONFIG.SERVER.HOST,
        routes: {
            cors: true,
            files: {
                // path from where the static assets should be served
                relativeTo: join(__dirname, '../assets/build'),
            },
        },
    });

    await setupPlugins(server);
    setupAuth(server);
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
