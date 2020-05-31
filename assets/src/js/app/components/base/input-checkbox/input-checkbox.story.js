import { text } from '@storybook/addon-knobs';
import withLayout from '../../../../storybook/decorators/withLayout';
import InputCheckbox from './input-checkbox.vue';

export default { title: 'Styleguide / Inputs / Checkbox', decorators: [withLayout] };

export const component = () => ({
    components: { InputCheckbox },
    props: {
        label: {
            default: text('Label', 'Foo'),
        },
    },
    template: '<input-checkbox :label="label"/>',
});
