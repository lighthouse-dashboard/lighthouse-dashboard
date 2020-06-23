export default {
    method: 'GET',
    path: '/app',
    options: {
        description: 'Main entry point',
        auth: false,
    },
    handler: (request, h) => {
        return h.redirect('/app/dashboard');
    },
};
