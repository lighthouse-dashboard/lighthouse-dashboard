export default [
    {
        path: '/project/:id',
        component: () => import('./project/project'),
        props: true,
    },

    {
        path: '/projects',
        component: () => import('./projects/projects'),
    },

    {
        path: '/',
        component: () => import('./overview/overview'),
    },
    {
        path: '/dashboard',
        component: () => import('./overview/overview'),
    },
];
