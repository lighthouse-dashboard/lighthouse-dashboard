import { text } from '@storybook/addon-knobs';
import LoginForm from './login-form.vue';

export default { title: 'Login Form' };

export const component = () => ({
    components: { LoginForm },
    props: {
        title: {
            default: text('Title', 'Login'),
        },
    },
    template: '<login-form :title="title"/>'
});
