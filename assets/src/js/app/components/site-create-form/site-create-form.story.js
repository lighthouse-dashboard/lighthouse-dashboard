import createFakeSite from '../../../../../../src/utils/create-fake-site';
import withLayout from '../../../storybook/decorators/withLayout';
import SiteCreateForm from './site-create-form.vue';

export default { title: 'Components / Site Create Form', decorators: [withLayout] };

export const component = () => ({
    components: { SiteCreateForm },
    data: () => ({
        page: createFakeSite(),
    }),
    template: '<site-create-form :value="page" />',
});
