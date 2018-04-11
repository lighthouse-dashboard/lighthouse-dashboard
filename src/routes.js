import Overview from './pages/Overview.vue';
import ProjectOverview from './pages/Project/Overview.vue';
import ProjectHistory from './pages/Project/History.vue';
import Project from './pages/Project/Main.vue';

export default [
    { path: '/', name: 'index', component: Overview },
    {
        path: '/:vcs/:username/:project',
        component: Project,
        props: true,
        name: 'project',
        children: [
            { path: '', name: 'overview', component: ProjectOverview, props: true },
            { path: 'history', name: 'history', component: ProjectHistory, props: true },
        ]
    },
]
