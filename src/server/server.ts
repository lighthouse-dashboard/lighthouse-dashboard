'use strict';
import {forEach} from 'lodash';
import {Server} from 'hapi';
import * as AuthBasic from 'hapi-auth-basic';
import {join, resolve} from 'path';
import * as Vision from 'vision';
import * as Inert from 'inert';
import ServiceContainer from 'servicecontainer';

const laabr = require('laabr');
const AuthBearer = require('hapi-auth-bearer-token');
const HapiSwagger = require('hapi-swagger');

const {name, version} = require('../../package.json');
import BearerStrategy from './auth/BearerStrategy';
import routes from './routes';

require('dotenv').config();

const TOKEN = process.env.CIRCLE_TOKEN;
const SECRET = <string>process.env.SECRET;
const PORT = process.env.PORT || 3000;
const LIMIT = process.env.LIMIT || 10;
const ENV = process.env.NODE_ENV || 'development';
const IS_DEV = ENV === 'development';
const IS_TEST = ENV === 'test';

let server: Server;
ServiceContainer.create(resolve(__dirname, 'config/services'));

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

    server.auth.strategy('bearer', 'bearer-access-token', BearerStrategy(SECRET));

    server.auth.default('bearer');

    forEach(routes(), route => server.route(route));

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
