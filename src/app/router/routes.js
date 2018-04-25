import Overview from '../pages/secure/dashboard/index';
import MainSecure from '../pages/secure/index';

import ProjectOverview from '../pages/secure/project-overview/index';
import ProjectHistory from '../pages/secure/project-history/index';
import ProjectBuild from '../pages/secure/project-builds/index';
import Project from '../pages/secure/project/index';

import Login from '../pages/login/index';
import Help from '../pages/help/index';
import Kiosk from '../pages/secure/kiosk/index';

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
