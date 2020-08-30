import { text } from '@storybook/addon-knobs';
import withLayout from '../../../storybook/decorators/withLayout';
import Tile from './tile';

export default {
    title: 'Base / Tile',
    decorators: [withLayout],
};

export const component = () => ({
    components: { Tile },
    props: {
        title: {
            default: text('Title', 'Foo Bar'),
        },
    },
    template: '<tile :title="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</tile>',
});
