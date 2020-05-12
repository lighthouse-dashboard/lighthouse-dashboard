import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/vue';
import { jsxDecorator } from 'storybook-addon-jsx';
import StoryRouter from 'storybook-vue-router';
import Vue from 'vue';
import routes from '../assets/src/js/app/pages/routes';
import registry from '../assets/src/js/framework/registry';
import { _breakpoints } from '../design-system/breakpoints.json'

registry(Vue);

addDecorator(withKnobs);
addDecorator(jsxDecorator);
addDecorator(StoryRouter({
    initialEntry: '/'
}, { routes }))


const customViewports = Object.entries(_breakpoints).reduce((acc, [key, value]) => {
    acc[key] = {
        name: key.toUpperCase(),
        styles: {
            width: `${ value }px`,
            height: '100%'
        },
    }
    return acc;
}, {})

addParameters({
    viewport: {
        viewports: customViewports,
        defaultViewport: 'XL',
    },
});
