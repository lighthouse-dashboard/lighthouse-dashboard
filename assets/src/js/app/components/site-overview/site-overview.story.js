import { text } from '@storybook/addon-knobs';
import createFakeReport from '../../../../../../src/utils/create-fake-report';
import withLayout from '../../../storybook/decorators/withLayout';
import SiteOverview from './site-overview.vue';

export default {
    title: 'Components / Site Overview',
    decorators: [withLayout],
};

export const component = () => ({
    components: { SiteOverview },
    props: {
        name: {
            default: text('Name', 'My Speedy Project'),
        },
    },
    data() {
        return {
            reports: [
                createFakeReport(),
                createFakeReport(),
                createFakeReport(),
            ],
        };
    },
    template: '<site-overview :name="name" url="http://fabs.io" id="123" :reports="reports" />',
});
