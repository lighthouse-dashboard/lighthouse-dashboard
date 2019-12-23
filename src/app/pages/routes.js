export default [
    {
        path: '/',
        component: () => import('./overview/overview'),
    }, {

        path: '/projects',
        component: () => import('./projects/projects'),
    },
];
