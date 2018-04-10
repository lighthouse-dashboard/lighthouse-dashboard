import Overview from './pages/Overview.vue';
import ProjectOverview from './pages/Project/Overview.vue';
import ProjectHistory from './pages/Project/History.vue';
import Project from './pages/Project/Main.vue';

export default [
    { path: '/', name: 'index', component: Overview },
    {
        path: '/:vcs/:username/:project/:token',
        component: Project,
        props: true,
        children: [
            { path: '', name: 'project', component: ProjectOverview, props: true },
            { path: 'history', name: 'history', component: ProjectHistory, props: true },
        ]

    },

]
