'use strict';

import Hapi from '@hapi/hapi';
import * as twig from 'twig';
import CONFIG from '../../config/server.js';
import logger from '../../lib/logger';
import { report } from '../../lib/reporter';
import { SERVER_ERROR, SERVER_SIGTERM } from '../../lib/reporter/Events';
import { root } from '../config/path';
import loadRoutes from '../router';
import configValidator from '../validator/config-validator';
import serverConfigSchema from '../validator/schemas/server-config-schema';
import setupAuth from '../auth';
import loadPlugins from '../plugins';

const IS_DEV = process.env.NODE_ENV === 'development';

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

    server.state('token', {
        isHttpOnly: false,
        isSecure: false,
        ttl: 1000 * 60 * 60 * 24, // 1 day lifetime
    });

    // server.events.on('log', (event) => console.log(event));

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

    if (!configValidator(serverConfigSchema, CONFIG)) {
        return;
    }
    logger.debug(`Config ok`);
    //
    // process.on('unhandledRejection', (err) => {
    //     logger.error(err);
    //     process.exit(1);
    // });

    process.on('SIGTERM', () => {
        report(SERVER_SIGTERM);
        logger.info('SIGTERM server');
        process.exit(0);
    });

    logger.info(`Starting server`);

    try {
        await start();
    } catch (e) {
        report(SERVER_ERROR);
        logger.error(e.message);
        throw e;
    }
}
