import { boolean, text } from '@storybook/addon-knobs';
import withLayout from '../../../../storybook/decorators/withLayout';
import InputField from './input-field.vue';

export default { title: 'Styleguide / Inputs / Field', decorators: [withLayout] };

export const component = () => ({
    components: { InputField },
    props: {
        error: {
            default: text('Error', ''),
        },
        label: {
            default: text('Label', 'Foo'),
        },
        disabled: {
            default: boolean('Disabled', false),
        },
    },
    template: '<input-field :label="label" :error="error" :disabled="disabled"/>',
});
