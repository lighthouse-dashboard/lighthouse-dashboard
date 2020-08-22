import withLayout from '../../../../storybook/decorators/withLayout';
import Chart from './bar-chart.vue';

export default {
    title: 'Components / Charts / Bar Chart',
    decorators: [withLayout],
};

export const component = () => ({
    components: { Chart },
    props: {
        series: {
            default: [
                { name: 'Foo', data: [10, 20, 30, 40] },
                { name: 'Bar', data: [20, 30, 40, 50] },
                { name: 'Baz', data: [30, 40, 50, 60] },
            ],
        },
        labels: {
            default: ['1', '2', '3', '4'],
        },
    },
    template: '<chart :series="series" :labels="labels"/>',
});
