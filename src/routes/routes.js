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
            auth: false,
        },
        handler: {
            file: 'templates/index.html',
        },
    },

    {
        method: 'GET',
        path: '/{param*}',
        options: {
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
