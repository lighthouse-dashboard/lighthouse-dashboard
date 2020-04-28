export default [
    {
        method: 'GET',
        path: '/',
        options: {
            description: 'Main entry point',
            auth: false,
        },
        handler: {
            file: 'templates/dist/index.html',
        },
    },

    {
        method: 'GET',
        path: '/index.html',
        options: {
            description: 'Main entry point',
            auth: false,
        },
        handler: {
            file: 'templates/dist/index.html',
        },
    },

    {
        method: 'GET',
        path: '/service-worker.js',
        options: {
            description: 'serviceworker entrypoint',
            auth: false,
        },
        handler: {
            file: 'assets/src/service-worker.js',
        },
    },

    {
        method: 'GET',
        path: '/dashboard',
        options: {
            description: 'Dashboard page',
            auth: false,
        },
        handler: {
            file: 'templates/dist/index.html',
        },
    },

    {
        method: 'GET',
        path: '/overview',
        options: {
            description: 'Overview page',
            auth: false,
        },
        handler: {
            file: 'templates/dist/index.html',
        },
    },

    {
        method: 'GET',
        path: '/projects',
        options: {
            description: 'List of projects',
            auth: false,
        },
        handler: {
            file: 'templates/dist/index.html',
        },
    },

    {
        method: 'GET',
        path: '/project/{id}',
        options: {
            description: 'Details of project',
            auth: false,
        },
        handler: {
            file: 'templates/dist/index.html',
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
                path: 'assets/dist',
                redirectToSlash: true,
                index: false,
            },
        },
    },
];
