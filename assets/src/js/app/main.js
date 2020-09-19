import 'es6-promise/auto';
import Vue from 'vue';
import Inview from 'vue-inview';
import Unicon from 'vue-unicons';
import {
    uniAnalysis,
    uniAnalytics,
    uniArchive,
    uniAward,
    uniBan,
    uniBrowser,
    uniChannel,
    uniClockFive,
    uniCog,
    uniDesktop,
    uniEdit,
    uniExclamationTriangle,
    uniFileAlt,
    uniGraphBar,
    uniHeart,
    uniHistory,
    uniImage,
    uniLock,
    uniMobileAndroid,
    uniRocket,
    uniSearch,
    uniShareAlt,
    uniTachometerFast,
    uniMultiply,
    uniKeyholeCircle,
} from 'vue-unicons/src/icons';


import registry from '../framework/registry';
import i18n from './translations';
import store from './vuex';

Vue.config.productionTip = false;

Unicon.add([uniKeyholeCircle, uniMultiply, uniRocket, uniShareAlt, uniTachometerFast, uniGraphBar, uniHistory, uniChannel, uniImage, uniHeart, uniAnalysis, uniAnalytics, uniArchive, uniAward, uniBan, uniClockFive, uniCog, uniDesktop, uniEdit, uniExclamationTriangle, uniFileAlt, uniLock, uniMobileAndroid, uniSearch, uniBrowser]);
Vue.use(Unicon, {
    height: 24,
    width: 24,
});

Vue.use(Inview);

registry(Vue, { store, i18n });

function mountComponent(node) {
    const name = node.getAttribute('is');
    const Component = new Vue(name);
    Component.$mount(node);
}

const nodes = document.querySelectorAll('component[is]');
Array.from(nodes).forEach(mountComponent);
