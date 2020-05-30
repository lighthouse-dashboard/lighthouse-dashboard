import { boolean, text } from '@storybook/addon-knobs';
import withLayout from '../../../../storybook/decorators/withLayout';
import InputSelect from './input-select.vue';

export default { title: 'Styleguide / Inputs / Select', decorators: [withLayout] };

export const component = () => ({
    components: { InputSelect },
    props: {
        label: {
            default: text('Label', 'Foo'),
        },
        disabled: {
            default: boolean('Disabled', false),
        },
    },
    template: '<input-select :label="label" :disabled="disabled" value="bar"><option value="foo">Foo</option><option value="bar">Bar</option></input-select>',
});
