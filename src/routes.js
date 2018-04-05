import Overview from './pages/Overview.vue';
import ProjectOverview from './pages/ProjectOverview.vue';

export default [
    { path: '/', name: 'index', component: Overview },
    { path: '/:vcs/:username/:project/:token', name: 'project', component: ProjectOverview, props: true },
]
