import withSitesAndLatestReport from '../containers/with-sites/with-sites-and-latest-report';
import Projects from './projects/projects';

export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('./login/login'),
        meta: { requiresAuth: false },
    },

    { path: '/', redirect: '/app' },

    {
        path: '/app',
        name: 'app',
        component: () => import('./app/app'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('./dashboard/dashboard'),
                meta: { requiresAuth: true },
            },
            {
                path: 'projects/:id',
                name: 'project.detail',
                component: () => import('./project/project'),
                props: true,
                meta: { requiresAuth: true },
            },
            {
                path: 'projects',
                name: 'projects',
                component: withSitesAndLatestReport(Projects),
                meta: { requiresAuth: true },
            },
            {
                path: 'overview',
                name: 'overview',
                component: () => import('./overview/overview'),
                meta: { requiresAuth: true },
            },
        ],
    },
];
