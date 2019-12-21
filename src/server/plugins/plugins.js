import Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import devErrors from 'hapi-dev-errors';
import laabr from 'laabr';

export const prodPlugins = () => [
    Inert,
    {
        plugin: devErrors,
        options: {
            showErrors: process.env.SHOW_ERROR_PAGES,
        },
    },
];

export const devPlugins = () => [
    {
        plugin: laabr,
    },
    Vision,
];
