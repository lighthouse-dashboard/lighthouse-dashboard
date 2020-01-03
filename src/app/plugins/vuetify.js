import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#2f97c0',
                accent: '#043e68',
                secondary: '#ffe18d',
                success: '#4caf50',
                info: '#2196f3',
                warning: '#fb8c00',
                error: '#ff5252'
            },
            light: {
                primary: '#1976d2',
                accent: '#e91e63',
                secondary: '#30b1dc',
                success: '#4caf50',
                info: '#2196f3',
                warning: '#fb8c00',
                error: '#ff5252'
            }
        }
    }
}

export default new Vuetify(opts);
