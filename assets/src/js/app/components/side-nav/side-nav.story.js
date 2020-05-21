import { text } from '@storybook/addon-knobs';
import withLayout from '../../../storybook/decorators/withLayout';
import SideNav from './side-nav.vue';

export default {
    title: 'Components / Side Nav',
    decorators: [withLayout],
};

export const component = () => ({
    components: { SideNav },
    props: {
        title: {
            default: text('Title', 'Lighthouse Dashboard'),
        },
        version: {
            default: text('Version', '1.0.0'),
        },
    },
    template: '<side-nav :title="title" :version="version"/>',
});
