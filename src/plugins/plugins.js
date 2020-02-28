/* eslint-disable global-require */

import * as Vision from '@hapi/vision';
import blipp from 'blipp';
import devErrors from 'hapi-dev-errors';
import HapiSwagger from 'hapi-swagger';

import { name, version } from '../../package.json';
import CONFIG from '../../config/server';

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
            plugin: blipp, options: { showAuth: true },
        },
    ],
    prod: [
        ...CONFIG.HAPI_PLUGINS,
        {
            plugin: devErrors,
            options: {
                showErrors: CONFIG.SHOW_ERROR_PAGES,
            },
        },
        /*
        {
            plugin: laabr,
        },
         */
    ],
};
