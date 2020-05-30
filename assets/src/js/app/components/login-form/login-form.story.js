import { text } from '@storybook/addon-knobs';
import withLayout from '../../../storybook/decorators/withLayout';

export default {
    title: 'Components / Login Form',
    decorators: [withLayout],
};

export const component = () => ({
    props: {
        title: {
            default: text('Title', 'Login'),
        },
    },
    template: '<login-form :title="title"/>',
});
