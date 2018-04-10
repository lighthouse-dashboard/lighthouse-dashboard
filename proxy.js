'use strict';

const Hapi = require('hapi');
const request = require('request');
const Boom = require('boom');

require('dotenv').config();

const TOKEN = process.env.CIRCLE_TOKEN;
const PORT = process.env.PORT || 3000;

const server = Hapi.server({
    port: PORT,
    host: '0.0.0.0',
    routes: {
        cors: true,
    }
});

const init = async () => {
    await server.start();
    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'dist',
                index: ['index.html']
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/artifacts',
        handler: async (req, h) => {
            const { url } = req.query;
            return await new Promise((resolve, rej) => {
                request(`${url}?&circle-token=${TOKEN}`, { json: true }, (err, res, body) => {
                    if (err) {
                        return rej(Boom.boomify(err));
                    }
                    return resolve(body);
                });
            });
        }
    });


    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
