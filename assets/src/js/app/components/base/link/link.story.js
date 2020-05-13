import Vue from 'vue';
import Link from './link';

Vue.component('link', Link);

export default { title: 'Styleguide / Link' };

export const primary = () => '<a href="/" class="link">Foo</a>'
