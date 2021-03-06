'use strict';

import Hapi from '@hapi/hapi';
import * as twig from 'twig';
import logger from '../../lib/logger';
import { report } from '../../lib/reporter';
import { SERVER_ERROR, SERVER_SIGTERM, SERVER_STARTUP } from '../../lib/reporter/Events';
import setupAuth from '../auth';
import { root } from '../config/path';
import loadPlugins from '../plugins';
import loadRoutes from '../router';
import formatDate from '../utils/format-date';

async function start() {
    const server = Hapi.server({
        debug: { request: ['error'] },
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

    twig.cache(false);

    twig.extendFilter('date', formatDate);

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
    logger.info(`Server started ${ server.info.uri }`);
}

export default async function boot() {
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
        await report(SERVER_STARTUP);
        await start();
    } catch (e) {
        await report(SERVER_ERROR, e);
        logger.error(e.message);
        throw e;
    }
}
