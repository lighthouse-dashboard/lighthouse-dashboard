import withLayout from '../../../../storybook/decorators/withLayout';
import RadarChart from './radar-chart.vue';

export default {
    title: 'Charts / Radar Chart',
    decorators: [withLayout],
};

export const component = () => ({
    components: { RadarChart },
    props: {
        series: {
            default: [
                { name: 'Foo', data: [10, 20, 30, 40] },
            ],
        },
        labels: {
            default: ['1', '2', '3', '4'],
        },
    },
    template: '<radar-chart :series="series" :labels="labels"/>',
});
