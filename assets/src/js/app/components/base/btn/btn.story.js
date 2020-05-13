import Vue from 'vue';
import Btn from './btn';

Vue.component('btn', Btn);

export default { title: 'Styleguide / Buttons' };

export const primary = () => '<btn>Foo</btn>'
export const disabled = () => '<btn :disabled="true">Foo</btn>'
