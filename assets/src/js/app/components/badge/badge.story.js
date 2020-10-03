import withLayout from '../../../storybook/decorators/withLayout';
import Badge from './badge.vue';
import { number, text } from '@storybook/addon-knobs';

export default { title: 'Styleguide Notifications / Badge', decorators: [withLayout] };

export const component = () => ({
    components: { Badge },
    props: {
        counter: { type: Number, default: number( 'Counter', 3 ) },
        text: {
            type: String,
            default: text( 'Text', 'Hello World' ),
        },
    },
    template: `
        <button class="btn btn__primary">
            <badge :counter="counter" style="display: flex;"/>
            {{ text }}
        </button>
    `,
});
