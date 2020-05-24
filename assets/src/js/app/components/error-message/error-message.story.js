import withLayout from '../../../storybook/decorators/withLayout';
import ErrorMessage from './error-message.vue';

export default { title: 'Components / Error Message', decorators: [withLayout] };

export const component = () => ({
    components: { ErrorMessage },
    template: '<error-message message="Hello World" />',
});
