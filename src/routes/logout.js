export default {
    method: 'GET',
    path: '/logout',
    options: {
        description: 'Logout view',
        auth: false,
    },
    handler: (request, h) => {
        return h.redirect('/').unstate('token');
    },
};
