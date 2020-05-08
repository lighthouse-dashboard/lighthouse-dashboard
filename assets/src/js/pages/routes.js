export default [
    {
        path: '/projects/:id',
        name: 'projects.detail',
        component: () => import('./project/project'),
        props: true,
    },
    {
        path: '/projects',
        name: 'projects',
        component: () => import('./projects/projects'),
    },
    {
        path: '/overview',
        name: 'overview',
        component: () => import('./overview/overview'),
    },

    {
        path: '/',
        name: 'home',
        component: () => import('./dashboard/dashboard'),
    },
];
