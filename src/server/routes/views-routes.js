import { title } from '../../../config/dashboard';
import { version } from '../../../package.json';

const DEFAULT_PARAMS = {
    G_ANALYTICS_ID: process.env.G_ANALYTICS_ID || false,
    TITLE: title,
    VERSION: version,
};

const basicViewHandler = (request, h) => {
    return h.view('index.twig', { ...DEFAULT_PARAMS });
};

export default [
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'Main entry point',
            auth: false,
        },
        handler: basicViewHandler,
    },

    {
        method: 'GET',
        path: '/login',
        options: {
            description: 'Main entry point',
            auth: false,
        },
        handler: basicViewHandler,
    },

    {
        method: 'GET',
        path: '/app/',
        options: {
            description: 'Main entry point',
            auth: false,
        },
        handler: basicViewHandler,
    },

    {
        method: 'GET',
        path: '/app/dashboard',
        options: {
            description: 'Dashboard page',
            auth: false,
        },
        handler: basicViewHandler,
    },

    {
        method: 'GET',
        path: '/app/overview',
        options: {
            description: 'Overview page',
            auth: false,
        },
        handler: basicViewHandler,
    },

    {
        method: 'GET',
        path: '/app/projects',
        options: {
            description: 'List of projects',
            auth: false,
        },
        handler: basicViewHandler,
    },

    {
        method: 'GET',
        path: '/app/projects/{id}',
        options: {
            description: 'Details of project',
            auth: false,
        },
        handler: basicViewHandler,
    },
];
