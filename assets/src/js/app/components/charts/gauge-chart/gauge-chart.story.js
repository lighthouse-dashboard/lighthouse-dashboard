import { number, text } from '@storybook/addon-knobs';
import withLayout from '../../../../storybook/decorators/withLayout';
import GaugeChart from './gauge-chart.vue';

export default {
    title: 'Charts / Gauge Chart',
    decorators: [withLayout],
};

export const component = () => ({
    components: { GaugeChart },
    props: {
        series: {
            default: [
                number('Value', 70),
            ],
        },
        labels: {
            default: [text('Label', 'Label')],
        },
    },
    template: '<gauge-chart :series="series" :labels="labels" />',
});
