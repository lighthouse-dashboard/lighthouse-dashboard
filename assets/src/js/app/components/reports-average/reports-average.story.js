import { number, text } from '@storybook/addon-knobs';
import withLayout from '../../../storybook/decorators/withLayout';
import ReportsAverage from './reports-average.vue';

export default {
    title: 'Reports / Reports Average',
    decorators: [withLayout],
};

export const component = () => ({
    components: { ReportsAverage },
    props: {
        score: {
            default: number('Score', 77),
        },
        title: {
            default: text('Title', 'Title'),
        },
    },
    data() {
        return {};
    },
    template: '<reports-average :score="score"  :title="title" />',
});
