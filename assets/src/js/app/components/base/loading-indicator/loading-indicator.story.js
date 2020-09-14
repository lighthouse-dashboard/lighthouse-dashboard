import withLayout from '../../../../storybook/decorators/withLayout';
import LoadingIndicator from './loading-indicator.vue';

export default {
    title: 'Styleguide / Loading Indicator',
    decorators: [withLayout],
};

export const large = () => ({
    components: { LoadingIndicator },
    template: '<loading-indicator />',
});

export const small = () => ({
    components: { LoadingIndicator },
    template: '<loading-indicator :facets="[\'small\']" />',
});
