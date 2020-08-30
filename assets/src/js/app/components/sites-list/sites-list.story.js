import createFakeSite from '../../../../../../src/utils/create-fake-site';
import withLayout from '../../../storybook/decorators/withLayout';
import SitesList from './sites-list.vue';

export default { title: 'Components / Sites / Sites List', decorators: [withLayout] };

export const component = () => ({
    components: { SitesList },
    data: () => ({
        sites: [
            createFakeSite(),
            createFakeSite(),
            createFakeSite(),
        ],
    }),
    template: '<sites-list :sites="sites" />',
});
