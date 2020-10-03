import Overlay from './overlay.vue';

export default { title: 'Overlays' };

export const component = () => ({
    components: { Overlay },
    props: {},
    template: '<overlay :active="true" title="Title">Hello World</overlay>',
});

export const withCustomActions = () => '<overlay :active="true" title="Title">Hello World<btn slot="actions">Create</btn></overlay>';
export const withAdditionalActions = () => '<overlay :active="true" title="Title">Hello World<btn slot="additional">Create</btn></overlay>';
