import Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import errorPage from 'hapi-error-page';
import laabr from 'laabr';

export const prodPlugins = [
    Inert
];

export const devPlugins = [
    {
        plugin: laabr,
    },
    Vision,
    errorPage
];
