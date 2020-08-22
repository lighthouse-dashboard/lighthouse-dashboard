import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/vue';
import { jsxDecorator } from 'storybook-addon-jsx';
import Vue from 'vue';
import i18n from '../assets/src/js/app/translations';
import registry from '../assets/src/js/framework/registry';
import { _breakpoints } from '../design-system/breakpoints.json'

registry(Vue, { i18n });

addParameters({
    options: {
        // display panel that shows addon configurations
        showPanel: true,
        // where to show the addon panel --- @type {('bottom'|'right')}
        panelPosition: 'bottom',
    }
});

addDecorator(withKnobs);
addDecorator(jsxDecorator);

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
    },
});
