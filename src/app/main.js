/*
      _          _             _
   __| |_ __ ___(_)_ __   ___ | |
  / _` | '__/ _ \ | '_ \ / _ \| |
 | (_| | | |  __/ | |_) | (_) | |
  \__,_|_|  \___|_| .__/ \___/|_|
                  |_|

 */

import Vue from 'vue';
import App from './App';
import VueResorce from 'vue-resource';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n'
import VueCookie from 'vue-cookie';

import AuthPlugin from './plugins/AuthPlugin';
import APIPlugin from './plugins/APIPlugin';
import ToastPlugin from './plugins/ToastPlugin';
import routes from './routes';
import Loader from './components/loader';
import translations from './translations';

import '@/assets/scss/main.scss';

import {
    refreshInterval,
    dateFormat,
    layout,
    defaultBranch,
    selectableBranches,
    buildStatusInterval,
    apiEndpoint,
    dateShortFormat,
    chartColors,
    reportCategories,
} from './config';

Vue.config.productionTip = false;

Vue.config.refreshInterval = refreshInterval;
Vue.config.dateFormat = dateFormat;
Vue.config.layout = layout; // list | grid
Vue.config.defaultBranch = defaultBranch;
Vue.config.selectableBranches = selectableBranches;
Vue.config.buildStatusInterval = buildStatusInterval;
Vue.config.apiEndpoint = apiEndpoint;
Vue.config.dateShortFormat = dateShortFormat;
Vue.config.chartColors = chartColors;
Vue.config.reportCategories = reportCategories;
Vue.config.versionUpdateInterval = 1000 * 60 * 60;

Vue.component('loader', Loader);

Vue.use(VueResorce);
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(VueCookie);

Vue.use(APIPlugin, {
    api: apiEndpoint,
    branch: Vue.config.defaultBranch,
});
Vue.use(ToastPlugin);
Vue.use(AuthPlugin);

Vue.http.interceptors.push((request) => {
    if (Vue.auth.isAuthenticated()) {
        request.headers.set('Authorization', `Bearer ${Vue.auth.token}`);
    }
});

const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth === false) {
        return next();
    }

    if (!Vue.auth.isAuthenticated()) {
        return next({ name: 'login' });
    }
    next();
});

const i18n = new VueI18n({
    locale: 'en', // set locale
    messages: translations
});

M.AutoInit();

new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>',
});
