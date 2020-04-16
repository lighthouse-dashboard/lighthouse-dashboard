
import * as pkg from './package.json';
import Joi from '@hapi/joi';
import Mongodb from 'mongodb';

const MongoClient = Mongodb.MongoClient;
const ObjectID = Mongodb.ObjectID;

const singleOption = Joi.object({
    url: Joi.string().default('mongodb://localhost:27017/test'),
    settings: Joi.object(),
}).strict();

const connect = async function(url, settings) {
    const client = await MongoClient.connect(url, settings);
    const db = await client.db();

    return { client, db };
};

exports.plugin = {
    async register(server, pluginOptions) {
        const option = await singleOption.validate(pluginOptions);
        const { url, settings } = option.value;

        const expose = {
            lib: Mongodb,
            ObjectID,
        };

        try {
            const result = await connect(url, settings);
            expose.db = result.db;
            expose.client = result.client;
            server.decorate('request', 'mongo', expose);
        } catch (err) {
            server.log(['hapi-mongodb', 'error'], err);
            throw err;
        }

        server.events.on('stop', () => {
            for (const client of [].concat(expose.client)) {
                client.close((err) => server.log(['hapi-mongodb', 'error'], err));
            }
        });
    },
    pkg,
};
