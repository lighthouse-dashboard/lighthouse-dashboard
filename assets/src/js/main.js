import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import FavoriteProjectsOverview from './components/favorite-projects-overview/favorite-projects-overview';
import SpeedOverview from './components/favorite-comparison/favorite-comparison';
import LatestAuditsFeed from './components/latest-audits-feed/latest-audits-feed';
import routes from './pages/routes';
import vuetify from './plugins/vuetify';
import store from './vuex';

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.component('favorite-projects-overview', FavoriteProjectsOverview);
Vue.component('favorite-projects-comparison', SpeedOverview);
Vue.component('latest-audits', LatestAuditsFeed);

const router = new VueRouter({
    mode: 'history',
    routes,
});

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App),
}).$mount('#app');
