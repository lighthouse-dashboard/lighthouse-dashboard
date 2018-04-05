// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResorce from 'vue-resource';
import VueRouter from 'vue-router';

import CirclePlugin from './plugins/CirclePlugin';
import routes from './routes';

Vue.config.productionTip = false;
Vue.config.refreshInterval = 1000 * 5;
Vue.config.buildsLimit = 5;
Vue.config.projects = require('./projects');

Vue.use(VueResorce);
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

Vue.use(CirclePlugin);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
