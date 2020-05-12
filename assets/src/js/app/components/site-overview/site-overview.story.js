import { text } from '@storybook/addon-knobs';
import SiteOverview from './site-overview.vue';

export default { title: 'Components / Site Overview' };

export const component = () => ({
    components: { SiteOverview },
    props: {
        name: {
            default: text('Name', 'My Speedy Project'),
        },
    },
    data() {
        return {
            datasets: [{
                'name': 'performance',
                'data': [100, 100, 92, 99, 98, 95, 97, 100, 98, 85, 97, 78, 99, 100, 0, 0, 93, 99, 99, 99, 99, 100, 100, 100, 98, 98, 97, 100, 99, 100]
            }, {
                'name': 'seo',
                'data': [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
            }, {
                'name': 'pwa',
                'data': [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 58, 31, 31, 31, 31, 31, 31]
            }, {
                'name': 'accessibility',
                'data': [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
            }, {
                'name': 'best-practices',
                'data': [86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86, 86]
            }],
        };
    },
    template: '<site-overview :name="name" url="http://fabs.io" id="123" :datasets="datasets" :labels="[\'Foo\']"/>'
});
