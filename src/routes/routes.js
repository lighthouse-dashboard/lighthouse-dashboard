import AUTH_ROUTES from '../api/auth/routes';
import REPORT_ROUTES from '../api/reports/routes';
import SITE_ROUTES from '../api/sites/routes';

export default [
    ...SITE_ROUTES,
    ...REPORT_ROUTES,
    ...AUTH_ROUTES,

    {
        method: 'GET',
        path: '/',
        options: {
            description: 'Main entry point',
            auth: false,
        },
        handler: {
            file: 'templates/index.html',
        },
    },

    {
        method: 'GET',
        path: '/projects',
        options: {
            description: 'List of projects',
            auth: 'jwt',
        },
        handler: {
            file: 'templates/index.html',
        },
    },

    {
        method: 'GET',
        path: '/{param*}',
        options: {
            description: 'Static assets',
            auth: false,
        },
        handler: {
            directory: {
                path: './',
                redirectToSlash: true,
                index: false,
            },
        },
    },
];
