import { DEFAULT_PARAMS } from '../utils/get-default-params';

const basicViewHandler = (request, h) => h.view('views/index.twig', { ...DEFAULT_PARAMS });

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
        path: '/app/',
        options: {
            description: 'Main entry point',
            auth: false,
        },
        handler: basicViewHandler,
    },
    {
        method: 'GET',
        path: '/app',
        options: {
            description: 'Main entry point',
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
];
