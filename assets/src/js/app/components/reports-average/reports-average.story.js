import { number } from '@storybook/addon-knobs';
import ReportsAverage from './reports-average.vue';

export default { title: 'Components / Reports Average' };

export const component = () => ({
    components: { ReportsAverage },
    props: {
        score: {
            default: number('Score', 77),
        },
        title: {
            default: string('Title', 'Title'),
        },
    },
    data() {
        return {};
    },
    template: '<reports-average :score="score"  :title="title" />'
});
