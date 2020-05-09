import { text } from '@storybook/addon-knobs';
import Navigation from './navigation.vue';

export default { title: 'Navigation' };

export const component = () => ({
    components: { Navigation },
    props: {
        title: {
            default: text('Title', 'Lighthouse Dashboard'),
        },
        version: {
            default: text('Version', '1.0.0'),
        },
    },
    template: '<navigation :title="title" :version="version"/>'
});
