'use strict';
require('dotenv').config();

import Hapi from '@hapi/hapi';
import { join } from 'path';
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

    await setupPlugins(server);
    setupRouter(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
