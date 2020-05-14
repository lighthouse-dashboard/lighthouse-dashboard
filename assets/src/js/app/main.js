import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Inview from 'vueinview';

import App from './App.vue';
import formatDate from './filters/format-date';
import routes from './pages/routes';
import { authRouteGuard } from './utils/auth-route-guard';
import store from './vuex';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Inview);

Vue.filter('date', formatDate);

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach(authRouteGuard);

new Vue({
    //vuetify,
    store,
    router,
    render: h => h(App),
}).$mount('#app');
