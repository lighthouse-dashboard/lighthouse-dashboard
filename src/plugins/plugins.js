import Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import blipp from 'blipp';
import JWT from 'hapi-auth-jwt2';
import devErrors from 'hapi-dev-errors';
import HapiSwagger from 'hapi-swagger';
import laabr from 'laabr';
import CONFIG from '../../dashboard.config';
import { name, version } from '../../package.json';

export const prodPlugins = () => [
    Inert,
    {
        plugin: devErrors,
        options: {
            showErrors: CONFIG.SERVER.SHOW_ERROR_PAGES,
        },
    },
    JWT,
    {
        plugin: laabr,
    },
    {
        plugin: blipp, options: { showAuth: true }
    },
];

export const devPlugins = () => [
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
];
