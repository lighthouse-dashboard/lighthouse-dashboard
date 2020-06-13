import { compose } from 'lodash/fp';
import withHealth from '../containers/with-health';
import withReports from '../containers/with-reports';
import withSiteInfo from '../containers/with-site-info';
import withSites from '../containers/with-sites/with-sites';
import withSystemInfo from '../containers/with-system-info';

const Project = () => import('./project/project');
const Projects = () => import('./projects/projects');
const Dashboard = () => import('./dashboard/dashboard');
const System = () => import('./system/system');
const Changelog = () => import('./system/changelog/changelog');


export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('./login/login'),
        meta: { requiresAuth: false },
    },

    { path: '/', redirect: '/app/' },

    {
        path: '/app',
        name: 'app',
        component: () => import('./app/app'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard,
                meta: { requiresAuth: true },
            },
            {
                path: 'projects/:id',
                name: 'project.detail',
                component: compose(withReports, withSiteInfo)(Project),
                props: true,
                meta: { requiresAuth: true },
            },
            {
                path: 'projects',
                name: 'projects',
                component: withSites(Projects),
                meta: { requiresAuth: true },
            },
            {
                path: 'system',
                name: 'system',
                component: compose(withSystemInfo, withHealth)(System),
                meta: { requiresAuth: true },
            },
            {
                path: 'system/changelog',
                name: 'changelog',
                component: Changelog,
                meta: { requiresAuth: true },
            },
        ],
    },
];
