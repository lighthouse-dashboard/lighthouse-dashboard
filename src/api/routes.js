export default [
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
]
