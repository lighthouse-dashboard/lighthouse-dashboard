'use strict';

import Hapi from '@hapi/hapi';
import { join } from 'path';
import dashboardConfig from '../dashboard.config';
import CONFIG from '../server.config.js';
import logger from './logger';
import setupAuth from './server/auth';
import loadPlugins from './server/plugins';
import loadRoutes from './server/routes';
import checkHealth from './utils/check-health';
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

    if (await checkHealth()) {
        logger.info('Starting server');
        await server.start();
    }
};

process.on('unhandledRejection', (err) => {
    logger.error(err);
    console.log(err);
    process.exit(1);
});

if (configValidator(dashboardConfigSchema, dashboardConfig) && configValidator(serverConfigSchema, CONFIG)) {
    init();
}
