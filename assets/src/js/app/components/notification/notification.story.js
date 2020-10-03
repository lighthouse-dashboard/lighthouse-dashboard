import { select, text } from '@storybook/addon-knobs';
import withLayout from '../../../storybook/decorators/withLayout';
import Notification from './notification.vue';

export default { title: 'Styleguide / Notifications', decorators: [withLayout] };

export const Component = () => ({
    components: { Notification },
    props: {
        facet: {
            type: String,
            default: [select( 'Facet', { Success: 'success', Warning: 'warning', Error: 'error' }, 'success' )],
        },
        text: { type: String, default: text( 'Text', 'Hello World' ) },
    },
    template: `
        <notification :facets="facet">{{ text }}</notification>`,
});
