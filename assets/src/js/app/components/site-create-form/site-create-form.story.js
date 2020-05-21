import withLayout from '../../../storybook/decorators/withLayout';
import SiteCreateForm from './site-create-form.vue';

export default { title: 'Components / Site Create Form', decorators: [withLayout] };

export const component = () => ({
    components: { SiteCreateForm },
    props: {

    },
    template: '<site-create-form />',
});
