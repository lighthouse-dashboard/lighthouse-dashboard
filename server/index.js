'use strict';

const Hapi = require('hapi');
const AuthBasic = require('hapi-auth-basic');
const AuthBearer = require('hapi-auth-bearer-token');
const path = require('path');
const laabr = require('laabr');

const basicStrategy = require('./auth/basicStrategy');
const bearerStrategy = require('./auth/bearerStrategy');
const routes = require('./routes');

require('dotenv').config();

const TOKEN = process.env.CIRCLE_TOKEN;
const PORT = process.env.PORT || 3000;
const LIMIT = process.env.LIMIT || 10;
const DISABLE_AUTH = !!(process.env.NO_AUTH) || false;

const server = Hapi.server({
    port: PORT,
    host: '0.0.0.0',
    routes: {
        cors: true,
        files: {
            relativeTo: path.join(__dirname, '..')
        }
    }
});


server.app.token = TOKEN;
server.app.limit = LIMIT;

const init = async () => {
    await server.register(require('inert'));
    await server.register(AuthBasic);
    await server.register(AuthBearer);
    await server.register({
        plugin: laabr
    });

    server.auth.strategy('bearer', 'bearer-access-token', bearerStrategy);

    server.auth.default('bearer');

    for (let i = 0; i < routes.length; i++) {
        server.route(routes[i]);
    }

    console.log(`Server running at: ${server.info.uri}`);
    await server.start();

};

init();
