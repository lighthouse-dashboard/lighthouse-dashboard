import Vue from 'vue';
import withLayout from '../../../storybook/decorators/withLayout';
import Typography from './typography.vue';

export default { title: 'Styleguide / Typography', decorators: [withLayout] };

Vue.component('typography', Typography);

export const component = () => '<typography/>';
