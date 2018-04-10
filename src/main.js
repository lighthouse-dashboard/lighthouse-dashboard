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

import CirclePlugin from './plugins/CirclePlugin';
import ToastPlugin from './plugins/ToastPlugin';
import routes from './routes';
import Loader from './components/Loader';

import { refreshInterval, buildsLimit, dateFormat, layout, defaultBranch, circleToken, selectableBranches } from './config';

Vue.config.productionTip = false;

Vue.config.refreshInterval = refreshInterval;
Vue.config.buildsLimit = buildsLimit;
Vue.config.dateFormat = dateFormat;
Vue.config.layout = layout; // list | grid
Vue.config.defaultBranch = defaultBranch;
Vue.config.circleToken = circleToken;
Vue.config.selectableBranches = selectableBranches;

Vue.component('loader', Loader);

Vue.use(VueResorce);
Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

Vue.use(CirclePlugin, {
    token: Vue.config.circleToken,
    branch: Vue.config.defaultBranch,
    limit: Vue.config.buildsLimit,
});
Vue.use(ToastPlugin);

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
});
