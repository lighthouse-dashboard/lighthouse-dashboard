import withLayout from '../../../storybook/decorators/withLayout';
import ChartPlaceholder from './chart-placeholder.vue';

export default { title: 'Charts / Chart Placeholder', decorators: [withLayout] };

export const component = () => ({
    components: { ChartPlaceholder },
    props: {},
    template: '<chart-placeholder />',
});
