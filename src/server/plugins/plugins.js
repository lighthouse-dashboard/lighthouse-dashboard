/* eslint-disable global-require */
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import blipp from 'blipp';
import HapiSwagger from 'hapi-swagger';

import { name, version } from '../../../package.json';
import * as mongoDecoratrorPlugin from 'hapi-mongodb-decorator';

export default () => ({
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
            plugin: mongoDecoratrorPlugin,
            options: {
                url: process.env.MONGODB_URI,
                settings: {
                    poolSize: 10,
                },
            },
        },
    ],
});
