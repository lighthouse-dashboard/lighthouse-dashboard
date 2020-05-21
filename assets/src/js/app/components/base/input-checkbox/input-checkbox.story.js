import { text } from '@storybook/addon-knobs';
import InputCheckbox from './input-checkbox.vue';

export default { title: 'Styleguide / Inputs / Checkbox' };

export const component = () => ({
    components: { InputCheckbox },
    props: {
        label: {
            default: text('Label', 'Foo'),
        },
    },
    template: '<input-checkbox :label="label"/>',
});
