export default [
    {
        path: '/project/:id',
        component: () => import('./project/project'),
        props: true,
    },

    {
        path: '/login',
        component: () => import('./login/login'),
    },

    {
        path: '/projects',
        component: () => import('./projects/projects'),
    },

    {
        path: '/',
        component: () => import('./overview/overview'),
    },
];
