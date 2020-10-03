import withLayout from '../../../../storybook/decorators/withLayout';
import LineChart from './line-chart.vue';

export default {
    title: 'Charts / Line Chart',
    decorators: [withLayout],
};

export const component = () => ({
    components: { LineChart },
    props: {
        dataSets: {
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
    template: '<line-chart :dataSets="dataSets" :labels="labels"/>',
});
