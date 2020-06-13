import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Inview from 'vueinview';

import registry from '../framework/registry';

import App from './App.vue';
import routes from './pages/routes';
import { authRouteGuard } from './utils/auth-route-guard';
import store from './vuex';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Inview);


registry(Vue);

if (process.env.NODE_ENV === 'develop') {
    // eslint-disable-next-line no-undef
    cssVarEditor();
}

const router = new VueRouter({
    mode: 'history',
    routes,
});

router.beforeEach(authRouteGuard);

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
