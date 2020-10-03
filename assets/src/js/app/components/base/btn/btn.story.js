import { boolean, select } from '@storybook/addon-knobs';
import withLayout from '../../../../storybook/decorators/withLayout';

export default {
    title: 'Styleguide / Buttons',
    decorators: [withLayout],
};

export const Component = () => ({
    props: {
        facet: {
            type: String,
            default: select( 'Facet', { Primary: 'primary', Secondary: 'secondary', Flat: 'flat', Danger: 'danger' } ),
        },
        disabled: {
            type: Boolean,
            default: boolean('Is Disabled', false),
        }
    },
    template: `
        <btn :facets="facet" :disabled="disabled">My Button</btn>`,
});
