import Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
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
];
