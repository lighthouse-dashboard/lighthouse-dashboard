import { text } from '@storybook/addon-knobs';
import withLayout from '../../../storybook/decorators/withLayout';
import LoginForm from './login-form';

export default {
    title: 'Components / Login Form',
    decorators: [withLayout],
};

export const component = () => ({
    components: { LoginForm },
    props: {
        title: {
            default: text('Title', 'Login'),
        },
    },
    template: '<login-form :title="title"/>',
});
