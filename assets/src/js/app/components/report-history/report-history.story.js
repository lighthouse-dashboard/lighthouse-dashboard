import { boolean } from '@storybook/addon-knobs';
import createFakeReport from '../../../../../../src/utils/create-fake-report';
import withLayout from '../../../storybook/decorators/withLayout';

export default {
    title: 'Components / Reports / Report History',
    decorators: [withLayout],
};

export const component = () => ({
    props: {
        isLoading: {
            default: boolean('Is Loading', false),
        },
    },
    data() {
        return {
            reports: [
                createFakeReport(),
                createFakeReport(),
                createFakeReport(),
                createFakeReport(),
            ],
        };
    },

    template: '<report-history :is-loading="isLoading" :reports="reports" />',
});
