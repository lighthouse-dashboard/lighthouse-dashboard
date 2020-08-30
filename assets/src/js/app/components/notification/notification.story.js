import withLayout from '../../../storybook/decorators/withLayout';
import Notification from './notification.vue';

export default { title: 'Base / Notification', decorators: [withLayout] };

export const Success = () => ({
    components: { Notification },
    template: '<notification :facets="[\'success\']">Hello World</notification>',
});

export const Warning = () => ({
    components: { Notification },
    template: '<notification :facets="[\'warning\']">Hello World</notification>',
});

export const Error = () => ({
    components: { Notification },
    template: '<notification :facets="[\'error\']">Hello World</notification>',
});
