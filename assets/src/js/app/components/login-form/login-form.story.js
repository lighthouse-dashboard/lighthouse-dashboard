import { text } from '@storybook/addon-knobs';

export default { title: 'Components / Login Form' };

export const component = () => ({
    props: {
        title: {
            default: text('Title', 'Login'),
        },
    },
    template: '<login-form :title="title"/>',
});
