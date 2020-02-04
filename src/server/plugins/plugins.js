/* eslint-disable global-require */

import Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import blipp from 'blipp';
import JWT from 'hapi-auth-jwt2';
import devErrors from 'hapi-dev-errors';
import HapiSwagger from 'hapi-swagger';
import laabr from 'laabr';

import { name, version } from '../../../package.json';
import CONFIG from '../../../server.config';

export default {
    dev: [
        Vision,
        {
            plugin: HapiSwagger,
            options: {
                info: {
                    title: name,
                    version: version,
                },
            },
        },

        {
            plugin: require('hapijs-status-monitor'),
            options: {
                title: 'Lighthouse Dashboard Status',
                path: '/status',
                spans: [
                    {
                        interval: 1,     // Every second
                        retention: 60    // Keep 60 datapoints in memory
                    },
                    {
                        interval: 5,     // Every 5 seconds
                        retention: 60
                    },
                    {
                        interval: 15,    // Every 15 seconds
                        retention: 60
                    },
                ],
                routeConfig: {
                    description: 'Service health',
                    auth: false,
                },
            },
        },
    ],
    prod: [
        Inert,
        {
            plugin: devErrors,
            options: {
                showErrors: CONFIG.SHOW_ERROR_PAGES,
            },
        },
        JWT,
        {
            plugin: laabr,
        },
        {
            plugin: blipp, options: { showAuth: true }
        },
    ],
};
