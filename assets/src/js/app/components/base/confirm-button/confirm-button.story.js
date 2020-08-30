import withLayout from '../../../../storybook/decorators/withLayout';
import ConfirmButton from './confirm-button.vue';

export default { title: 'Base / Confirm Button', decorators: [withLayout] };

export const component = () => ({
    components: { ConfirmButton },
    props: {},
    template: '<confirm-button confirm="Click again to confirm" :facets="[\'danger\']">Click</confirm-button>',
});
