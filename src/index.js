'use strict';

import Hapi from '@hapi/hapi';
import { join } from 'path';
import dashboardConfig from '../dashboard.config';
import CONFIG from '../server.config.js';
import setupAuth from './server/auth';
import logger from './logger';
import loadPlugins from './server/plugins';
import loadRoutes from './server/routes';
import configValidator from './validator/config-validator';
import dashboardConfigSchema from './validator/schemas/dashboard-config-schema';
import serverConfigSchema from './validator/schemas/server-config-schema';

if (process.env.SENTRY_DSN) {
    const Sentry = require('@sentry/node');
    Sentry.init({ dsn: process.env.SENTRY_DSN });
}

const init = async () => {
    const server = Hapi.server({
        port: CONFIG.PORT,
        host: CONFIG.HOST,
        routes: {
            cors: true,
            files: {
                // path from where the static assets should be served
                relativeTo: join(__dirname, '../assets/build'),
            },
        },
    });

    await setupAuth(server);
    await loadRoutes(server);
    await loadPlugins(server);
    await server.start();

    logger.info(`Server running on ${ server.info.uri }`);
};

process.on('unhandledRejection', (err) => {
    logger.error(err);
    console.log(err);
    process.exit(1);
});

if (configValidator(dashboardConfigSchema, dashboardConfig) && configValidator(serverConfigSchema, CONFIG)) {
    init();
}
