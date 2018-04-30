'use strict';
import {Server} from 'hapi';
import * as AuthBasic from 'hapi-auth-basic';
import { join } from 'path';
import * as Vision from 'vision';
import * as Inert from 'inert';

const laabr = require('laabr');
const AuthBearer = require('hapi-auth-bearer-token');
const HapiSwagger = require('hapi-swagger');

const {name, version} = require('../../package.json');
import bearerStrategy from './auth/bearerStrategy';
import routes from './routes';

require('dotenv').config()

const TOKEN = process.env.CIRCLE_TOKEN;
const PORT = process.env.PORT || 3000;
const LIMIT = process.env.LIMIT || 10;
const ENV = process.env.NODE_ENV || 'development';
const IS_DEV = ENV === 'development';

let server:Server;

const swaggerOptions = {
    info: {
        title: name,
        version: version,
    },
};

const init = async () => {
    await server.register(Inert);
    await server.register(AuthBasic);
    await server.register(AuthBearer);


    if (IS_DEV) {
        await server.register({
            plugin: laabr,
        });

        await server.register([{
            plugin: HapiSwagger,
            options: swaggerOptions,
        }]);

        await server.register([
            Vision,

        ]);
    }

    server.auth.strategy('bearer', 'bearer-access-token', bearerStrategy);

    server.auth.default('bearer');

    for (let i = 0; i < routes.length; i++) {
        server.route(routes[i]);
    }

    if (IS_DEV) {
        console.log(`Server running at: ${ server.info.uri }`);
    }

    await server.start();
};


export async function stop() {
    return await server.stop();
}

export async function start() {

    server = new Server({
        port: PORT,
        host: '0.0.0.0',
        routes: {
            cors: true,
            files: {
                relativeTo: join(__dirname, '..'),
            },
        },
    });


    server.app = {
        token: TOKEN,
        limit: LIMIT
    };

    return await init();
}
