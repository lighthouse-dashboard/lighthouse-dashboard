'use strict';

import Hapi from '@hapi/hapi';
import { join } from 'path';
import dashboardConfig from '../../config/dashboard';
import CONFIG from '../../config/server.js';
import logger from '../logger';
import checkHealth from '../utils/check-health';
import configValidator from '../validator/config-validator';
import dashboardConfigSchema from '../validator/schemas/dashboard-config-schema';
import serverConfigSchema from '../validator/schemas/server-config-schema';
import setupAuth from './auth';
import loadPlugins from './plugins';
import loadRoutes from './routes';

const RESTART_INTERVAL = process.env.RESTART_TIMEOUT;

async function start() {
    const server = Hapi.server({
        port: process.env.PORT || 4000,
        host: process.env.HOST || '0.0.0.0',
        routes: {
            cors: true,
            files: {
                // path from where the static assets should be served
                relativeTo: join(__dirname, '../../assets/build'),
            },
        },
    });

    await setupAuth(server);
    await loadPlugins(server);
    await loadRoutes(server);

    await server.start();
    logger.info('Server started');
}

export async function setup() {
    logger.debug(`Setting up process listener`);
    process.on('unhandledRejection', (err) => {
        logger.error(err);
        process.exit(1);
    });

    process.on('SIGTERM', () => {
        logger.info('SIGTERM server');
    });

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

        if (process.env.NODE_ENV !== 'development') {
            logger.debug(`Rebooting server in ${ RESTART_INTERVAL }ms`);
            setTimeout(() => boot(), RESTART_INTERVAL);
        }
    }
}
