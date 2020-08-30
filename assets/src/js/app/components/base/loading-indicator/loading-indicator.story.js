import withLayout from '../../../../storybook/decorators/withLayout';
import LoadingIndicator from './loading-indicator.vue';

export default {
    title: 'Styleguide / Loading Indicator',
    decorators: [withLayout],
};

export const component = () => ({
    components: { LoadingIndicator },
    props: {},
    template: '<loading-indicator />',
});
