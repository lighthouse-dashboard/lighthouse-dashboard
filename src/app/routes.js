import Overview from './pages/secure/dashboard';
import MainSecure from './pages/secure';

import ProjectOverview from './pages/secure/project-overview';
import ProjectHistory from './pages/secure/project-history';
import ProjectBuild from './pages/secure/project-builds';
import Project from './pages/secure/project';

import Login from './pages/login';
import Help from './pages/help';
import Kiosk from './pages/secure/kiosk';

export default [
    { path: '/login', name: 'login', component: Login, meta: { requiresAuth: false } },
    { path: '/kiosk', name: 'kiosk', component: Kiosk },
    {
        path: '/',
        name: 'index',
        component: MainSecure,
        children: [
            { path: '', name: 'dashboard', component: Overview },
            { path: '/help', name: 'help', component: Help },

            {
                path: ':vcs/:username/:project',
                component: Project,
                props: true,
                children: [
                    { path: '', name: 'overview', component: ProjectOverview, props: true },
                    { path: 'builds', name: 'builds', component: ProjectBuild, props: true },
                    { path: 'history', name: 'history', component: ProjectHistory, props: true },
                ],
            },
        ],
    },
];
