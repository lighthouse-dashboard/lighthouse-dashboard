'use strict';

import Hapi from '@hapi/hapi';
import { join } from 'path';
import dashboardConfig from '../../dashboard.config';
import CONFIG from '../../server.config.js';
import logger from '../logger';
import checkHealth from '../utils/check-health';
import configValidator from '../validator/config-validator';
import dashboardConfigSchema from '../validator/schemas/dashboard-config-schema';
import serverConfigSchema from '../validator/schemas/server-config-schema';
import setupAuth from './auth';
import loadPlugins from './plugins';
import loadRoutes from './routes';

async function start() {
    const server = Hapi.server({
        port: CONFIG.PORT,
        host: CONFIG.HOST,
        routes: {
            cors: true,
            files: {
                // path from where the static assets should be served
                relativeTo: join(__dirname, '../../assets/build'),
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
}

export default function app() {
    logger.info(`Starting server worker`);

    logger.debug(`Setting up process listener`);
    process.on('unhandledRejection', (err) => {
        logger.error(err);
        console.log(err);
        process.exit(1);
    });


    process.on('SIGTERM', () => {
        logger.info('SIGTERM server worker');
    });

    if (process.env.SENTRY_DSN) {
        logger.debug(`Setting up sentry`);
        // eslint-disable-next-line global-require
        const Sentry = require('@sentry/node');
        Sentry.init({ dsn: process.env.SENTRY_DSN });
    }

    logger.debug(`Validating config`);
    if (configValidator(dashboardConfigSchema, dashboardConfig) && configValidator(serverConfigSchema, CONFIG)) {
        start();
    }
}

