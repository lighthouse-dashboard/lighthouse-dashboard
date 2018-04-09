'use strict';

const Hapi = require('hapi');
const request = require('request');
const Boom = require('boom');

const TOKEN = process.env.CIRCLE_TOKEN;

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
    routes: {
        cors: true
    }
});

server.route({
    method: 'GET',
    path: '/artifacts',
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

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
