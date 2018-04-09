import Overview from './pages/Overview.vue';
import ProjectOverview from './pages/ProjectOverview.vue';
import ProjectHistory from './pages/ProjectHistory.vue';

export default [
    { path: '/', name: 'index', component: Overview },
    { path: '/:vcs/:username/:project/:token', name: 'project', component: ProjectOverview, props: true },
    { path: '/:vcs/:username/:project/:token/history', name: 'history', component: ProjectHistory, props: true },
]
