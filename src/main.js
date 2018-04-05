// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResorce from 'vue-resource';

import CirclePlugin from './plugins/CirclePlugin';

Vue.config.productionTip = false;
Vue.config.refreshInterval = 1000 * 5;

Vue.use(VueResorce);
Vue.use(CirclePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});
