'use strict';

const Hapi = require('hapi');
const AuthBearer = require('hapi-auth-bearer-token');
const AuthBasic = require('hapi-auth-basic');
const path = require('path');

const basicStrategy = require('./auth/basicStrategy');
const routes = require('./routes');

require('dotenv').config();

const TOKEN = process.env.CIRCLE_TOKEN;
const PORT = process.env.PORT || 3000;
const LIMIT = process.env.LIMIT || 10;
const SECRET = process.env.SECRET || 'dev';

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
server.app.secret = SECRET;

const init = async () => {
    await server.register(require('inert'));
    await server.register(AuthBearer);
    await server.register(AuthBasic);

    server.auth.strategy('basic', 'basic', basicStrategy);

    for (let i = 0; i < routes.length; i++) {
        server.route(routes[i]);
    }

    console.log(`Server running at: ${server.info.uri}`);
    await server.start();

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
