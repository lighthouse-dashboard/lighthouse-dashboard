/* eslint-disable global-require */
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import blipp from 'blipp';
import hapiError from 'hapi-error';
import * as mongoDecoratrorPlugin from 'hapi-mongodb-decorator';
import HapiSwagger from 'hapi-swagger';

import { name, version } from '../../../package.json';

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
                showErrors:true,
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
        // {
        //     plugin: hapiError,
        //     options: {
        //         templateName: 'views/error',
        //         statusCodes: {
        //             401: { // if the statusCode is 401
        //                 redirect: '/login', // redirect to /login page/endpoint
        //             },
        //             403: { // if the statusCode is 403
        //                 redirect: (request) => `/login?redirect=${ request.url.pathname }`,
        //             },
        //         },
        //     },
        // },
    ],
});
