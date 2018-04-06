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
import routes from './routes';
import Loader from './components/Loader';

Vue.config.productionTip = false;
Vue.config.refreshInterval = 1000 * 15;
Vue.config.buildsLimit = 10;
Vue.config.dateFormat = 'DD-MM-YYYY HH:mm:SS';
Vue.config.projects = require('./projects');
Vue.config.layout = 'list'; // list | grid

Vue.component('loader', Loader);

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
