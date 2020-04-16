import joi from '@hapi/joi';
import amqp from 'amqplib';
import * as pkg from './package.json';


const singleOption = joi.object({
    url: joi.string().default('amqp://user:password@localhost'),
}).strict();

const connect = async function(uri) {
    const connection = await amqp.connect(uri);
    const channel = await connection.createChannel();
    return { connection, channel };
};

exports.plugin = {
    async register(server, pluginOptions) {
        const option = await singleOption.validate(pluginOptions);
        const { uri } = option.value;

        const expose = {};

        try {
            const result = await connect(uri);
            expose.connection = result.connection;
            expose.channel = result.channel;
            server.decorate('request', 'amqp', expose);
        } catch (err) {
            server.log(['hapi-amqp', 'error'], err);
            throw err;
        }

        server.events.on('stop', async () => {
            for (const connection of [].concat(expose.connection)) {
                await connection.close((err) => server.log(['hapi-amqp', 'error'], err));
            }
        });
    },
    pkg,
};
