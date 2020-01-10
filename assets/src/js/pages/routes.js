export default [
    {
        path: '/',
        component: () => import('./overview/overview'),
    },
    {
        path: '/login',
        component: () => import('./login/login'),
    },
    {
        path: '/projects',
        component: () => import('./projects/projects'),
    },
];
