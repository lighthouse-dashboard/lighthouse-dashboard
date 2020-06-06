/* eslint-disable global-require */
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import blipp from 'blipp';
import HapiSwagger from 'hapi-swagger';
import laabr from 'laabr';

import { name, version } from '../../../package.json';
import * as MongoDb from './mongodb-plugin/mongodb-plugin';
import * as Amqp from './amqp-plugin';

export default {
    dev: [
        { plugin: blipp, options: { showAuth: true } },
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: name,
                    version: version,
                },
                grouping: 'tags',
                tags: [
                    { name: 'sites', description: 'Sites API' },
                    { name: 'auth', description: 'Auth API' },
                    { name: 'health', description: 'Health API' },
                    { name: 'reports', description: 'Reports API' },
                ],
            },
        },
        {
            plugin: require('hapi-dev-errors'),
            options: {
                showErrors: process.env.NODE_ENV !== 'production',
            },
        },
    ],
    prod: [
        Inert,
        Vision,
        {
            plugin: MongoDb,
            options: {
                url: process.env.MONGODB_URI,
                settings: {
                    poolSize: 10,
                },
            },
        },
        {
            plugin: Amqp,
            options: {
                uri: process.env.MESSAGE_QUEUE_URI,
            },
        },
    ],
};
