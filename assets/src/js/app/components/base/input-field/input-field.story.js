import { boolean, text } from '@storybook/addon-knobs';
import InputField from './input-field.vue';

export default { title: 'Styleguide / Input Field' };

export const component = () => ({
    components: { InputField },
    props: {
        error: {
            default: text('Error', ''),
        },
        disabled: {
            default: boolean('Disabled', false),
        },
    },
    template: '<input-field :error="error" :disabled="disabled"/>',
});
