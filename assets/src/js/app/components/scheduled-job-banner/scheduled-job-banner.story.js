import createFakeSite from '../../../../../../src/utils/create-fake-site';
import ScheduledJobBanner from './scheduled-job-banner.vue';

export default { title: 'Components / Sites / Scheduled Job Banner' };

export const component = () => ({
    components: { ScheduledJobBanner },
    data: () => ({
        site: createFakeSite({ is_scheduled: true, }),
    }),
    template: '<scheduled-job-banner :site="site" />',
});
