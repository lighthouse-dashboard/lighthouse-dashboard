import withLayout from '../../../../storybook/decorators/withLayout';
import ConfirmButton from './confirm-button.vue';

export default { title: 'confirm-button', decorators: [withLayout] };

export const component = () => ({
    components: { ConfirmButton },
    props: {},
    template: '<confirm-button>Click</confirm-button>',
});
