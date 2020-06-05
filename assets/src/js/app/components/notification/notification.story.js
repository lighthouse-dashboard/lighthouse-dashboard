import withLayout from '../../../storybook/decorators/withLayout';
import Notification from './notification.vue';

export default { title: 'Components / Notification', decorators: [withLayout] };

export const success = () => ({
    components: { Notification },
    template: '<notification :facets="[\'success\']">Hello World</notification>',
});
