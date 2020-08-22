import Vue from 'vue';
import VueI18n from 'vue-i18n';
import TRANSLATIONS_EN from '../../../../static/translations/en.json';

Vue.use(VueI18n);

export default new VueI18n({
    locale: 'en', // set locale
    messages: {
        en: TRANSLATIONS_EN,
    },
});
