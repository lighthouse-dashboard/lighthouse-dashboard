import VueRouter from 'vue-router';
import Vue from 'vue';

import routes from '@/router/routes';
import store from '@/store';
import {
    SET_ROUTE_BRANCH,
} from '@/store/mutations';

const router = new VueRouter({
    routes,
});


router.beforeEach((to, from, next) => {
    store.commit(SET_ROUTE_BRANCH, { value: to.query.branch });

    if (to.meta.requiresAuth === false) {
        return next();
    }

    if (!Vue.auth.isAuthenticated()) {
        return next({ name: 'login' });
    }
    next();
});

export default router;
