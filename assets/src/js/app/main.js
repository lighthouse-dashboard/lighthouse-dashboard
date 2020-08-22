import 'es6-promise/auto';
import Vue from 'vue';

import registry from '../framework/registry';
import i18n from './translations';
import store from './vuex';

Vue.config.productionTip = false;


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
