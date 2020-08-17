import 'es6-promise/auto';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import TRANSLATIONS_EN from '../../../static/translations/en.json';

import registry from '../framework/registry';
import store from './vuex';

Vue.config.productionTip = false;

Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'en', // set locale
    messages: {
        en: TRANSLATIONS_EN,
    },
});


registry(Vue, { store, i18n });

if (process.env.NODE_ENV === 'develop') {
    // eslint-disable-next-line no-undef
    cssVarEditor();
}

function mountComponent(node) {
    const name = node.getAttribute('is');
    const Component = new Vue(name);
    Component.$mount(node);
}

const nodes = document.querySelectorAll('component[is]');
Array.from(nodes).forEach(mountComponent);
