import withLayout from '../../../../storybook/decorators/withLayout';

export default {
    title: 'Styleguide / Buttons',
    decorators: [withLayout],
};

export const primary = () => '<btn>Primary</btn>';
export const primaryDisabled = () => '<btn :disabled="true">Disabled</btn>';
export const secondary = () => '<btn facets="secondary">Secondary</btn>';
export const secondaryDisabled = () => '<btn facets="secondary" :disabled="true">Secondary</btn>';
export const flat = () => '<btn facets="flat">Flat</btn>';
export const flatDisabled = () => '<btn facets="flat" :disabled="true">Flat</btn>';
export const danger = () => '<btn facets="danger">Danger</btn>';
export const dangerDisabled = () => '<btn facets="danger" :disabled="true">Danger</btn>';
