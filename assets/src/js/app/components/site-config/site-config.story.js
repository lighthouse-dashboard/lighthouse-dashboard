import createFakeSite from '../../../../../../src/utils/create-fake-site';
import withLayout from '../../../storybook/decorators/withLayout';
import SiteConfig from './site-config';

export default {
    title: 'Components / Sites / Site Config',
    decorators: [withLayout],
};

export const component = () => ({
    components: { SiteConfig },
    props: {
        site: {
            default: createFakeSite(),
        },
    },
    data() {
        return {};
    },
    template: '<site-config :site="site"/>',
});
