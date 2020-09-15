const routes = [
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
        path: '/static/{param*}',
        options: {
            description: 'Static assets',
            auth: false,
        },
        handler: {
            directory: {
                path: 'assets/static',
                redirectToSlash: true,
                index: false,
            },
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

if (Boolean(process.env.ENABLE_STORYBOOK_VIEW) === true) {
    routes.push({
        method: 'GET',
        path: '/storybook/{param*}',
        options: {
            description: 'Stroybook',
            auth: false,
        },
        handler: {
            directory: {
                path: 'assets/storybook/',
                redirectToSlash: true,
                index: false,
            },
        },
    });
}

export default routes;
