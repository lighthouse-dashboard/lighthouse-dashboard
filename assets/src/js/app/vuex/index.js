import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login';
import sites from './modules/sites';
import reports from './modules/reports';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        login,
        sites,
        reports,
    },
});
