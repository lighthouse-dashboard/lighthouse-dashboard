'use strict';

import Hapi from '@hapi/hapi';
import * as twig from 'twig';
import dashboardConfig from '../../config/dashboard';
import CONFIG from '../../config/server.js';
import { root } from '../config/path';
import logger from '../logger';
import loadRoutes from '../routes';
import { IS_DEV } from '../utils/env';
import configValidator from '../validator/config-validator';
import dashboardConfigSchema from '../validator/schemas/dashboard-config-schema';
import serverConfigSchema from '../validator/schemas/server-config-schema';
import setupAuth from './auth';
import loadPlugins from './plugins';

const RESTART_INTERVAL = 5000;

async function start() {
    const server = Hapi.server({
        port: process.env.PORT || 4000,
        host: process.env.HOST || '0.0.0.0',
        routes: {
            cors: true,
            files: {
                relativeTo: root,
            },
        },
    });

    server.events.on('log', (event) => logger.info(event.data));

    await setupAuth(server);
    await loadPlugins(server);
    await loadRoutes(server);

    twig.cache(!IS_DEV);

    await server.views({
        engines: {
            twig: {
                compile: (src, options) => {
                    const template = twig.twig({
                        path: options.filename,
                        data: src,
                    });
                    return (context) => {
                        return template.render({
                            ...context,
                        });
                    };
                },
            },
        },
        relativeTo: root,
        path: 'templates/.',
    });

    await server.start();
    logger.info('Server started');
}

export default async function boot() {
    logger.debug(`Validating config`);

    if (!configValidator(dashboardConfigSchema, dashboardConfig) || !configValidator(serverConfigSchema, CONFIG)) {
        return;
    }
    logger.debug(`Config ok`);

    process.on('unhandledRejection', (err) => {
        logger.error(err);
        process.exit(1);
    });

    process.on('SIGTERM', () => {
        logger.info('SIGTERM server');
    });

    logger.info(`Starting server`);

    try {
        await start();
    } catch (e) {
        logger.error(e.message);
        if (!IS_DEV) {
            logger.debug(`Rebooting server in ${ RESTART_INTERVAL }ms`);
            setTimeout(() => boot(), RESTART_INTERVAL);
        }
    }
}
