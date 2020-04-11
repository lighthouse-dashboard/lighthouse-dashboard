/* eslint-disable global-require */
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import blipp from 'blipp';
import HapiSwagger from 'hapi-swagger';
import laabr from 'laabr';

import { name, version } from '../../../package.json';

export default {
    dev: [
        { plugin: blipp, options: { showAuth: true } },
        { plugin: laabr, options: {} },
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: name,
                    version: version,
                },
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
    ],
};
