import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import CONFIG from '../../../../config/dashboard';

Vue.use(Vuetify);

const opts = {
    theme: {
        dark: true,
        themes: CONFIG.ui.theme,
    },
};

export default new Vuetify(opts);
