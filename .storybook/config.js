import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator } from '@storybook/vue';
import { jsxDecorator } from 'storybook-addon-jsx';
import StoryRouter from 'storybook-vue-router';
import routes from '../assets/src/js/app/pages/routes';
import Vue from 'vue';
import registry from '../assets/src/js/framework/registry';

registry(Vue);

addDecorator(withKnobs);
addDecorator(jsxDecorator);
addDecorator(StoryRouter({
    initialEntry: '/'
}, { routes }))
