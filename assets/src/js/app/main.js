import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Inview from 'vueinview';
import { VuejsDatatableFactory } from 'vuejs-datatable';
import registry from '../framework/registry';


import App from './App.vue';
import routes from './pages/routes';
import { authRouteGuard } from './utils/auth-route-guard';
import store from './vuex';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Inview);
Vue.use(VuejsDatatableFactory);

registry(Vue);

cssVarEditor();

VuejsDatatableFactory.useDefaultType(false)
    .registerTableType('datatable', tableType => tableType.mergeSettings({
        table: {
            class: 'data-table',
        },
    }));


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
