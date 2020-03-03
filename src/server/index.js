'use strict';

import Hapi from '@hapi/hapi';
import { join } from 'path';
import dashboardConfig from '../../config/dashboard';
import CONFIG from '../../config/server.js';
import setupAuth from '../auth';
import logger from '../logger';
import loadPlugins from '../plugins';
import loadRoutes from '../routes';
import checkHealth from '../utils/check-health';
import configValidator from '../validator/config-validator';
import dashboardConfigSchema from '../validator/schemas/dashboard-config-schema';
import serverConfigSchema from '../validator/schemas/server-config-schema';

const RESTART_INTERVAL = process.env.RESTART_TIMEOUT;

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

    await server.start();
    logger.info('Server started');
}

export async function setup() {
    if (!await checkHealth()) {
        return;
    }

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

    logger.info(`Starting server`);
    await start();
}

export default async function boot() {
    logger.debug(`Validating config`);
    if (!configValidator(dashboardConfigSchema, dashboardConfig) || !configValidator(serverConfigSchema, CONFIG)) {
        return;
    }
    logger.debug(`Config ok`);

    try {
        await setup();
    } catch (e) {
        logger.error(e.message);
        logger.debug(`Rebooting server in ${ RESTART_INTERVAL }ms`);
        setTimeout(() => boot(), RESTART_INTERVAL);
    }
}
