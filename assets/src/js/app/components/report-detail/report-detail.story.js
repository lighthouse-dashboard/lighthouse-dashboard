import createFakeReport from '../../../../../../src/utils/create-fake-report';
import withLayout from '../../../storybook/decorators/withLayout';

export default {
    title: 'Components / Reports / Report Detail',
    decorators: [withLayout],
};

export const component = () => ({
    props: {},
    data() {
        return {
            report: createFakeReport(),
        };
    },

    template: '<report-detail :report="report" />',
});
