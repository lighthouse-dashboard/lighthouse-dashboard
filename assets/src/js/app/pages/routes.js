import { compose } from 'lodash/fp';
import withReports from '../containers/with-reports';
import withSiteInfo from '../containers/with-site-info';
import withSitesAndLatestReport from '../containers/with-sites/with-sites-and-latest-report';

const Project = () => import('./project/project');
const Projects = () => import('./projects/projects');
const Dashboard = () => import('./dashboard/dashboard');


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
                component: withSitesAndLatestReport(Projects),
                meta: { requiresAuth: true },
            },
        ],
    },
];
