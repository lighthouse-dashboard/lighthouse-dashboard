import { text } from '@storybook/addon-knobs';
import Navigation from './navigation.vue';

export default { title: 'Navigation' };

export const component = () => ({
    components: { Navigation },
    props: {
        title: {
            default: text('Title', 'Lighthouse Dashboard'),
        },
    },
    template: '<navigation :title="title"/>'
});
