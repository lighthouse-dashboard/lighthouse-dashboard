export default [
    {
        path: '/projects/:id',
        component: () => import('./project/project'),
        props: true,
    },
    {
        path: '/projects',
        component: () => import('./projects/projects'),
    },
    {
        path: '/overview',
        component: () => import('./overview/overview'),
    },

    {
        path: '/',
        component: () => import('./dashboard/dashboard'),
    },
    {
        path: '/dashboard',
        component: () => import('./dashboard/dashboard'),
    },
];
