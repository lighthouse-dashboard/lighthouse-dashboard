<template>
    <component class='btn button'
            v-bind="$attrs"
            :class='classes'
            :to="to"
            :disabled='disabled'
            :is="component">
        <span class='btn--content'>
            <slot/>
        </span>
    </component>
</template>

<script>
    import bemMixin from '../../../mixins/bem-mixin';

    export default {
        mixins: [bemMixin('btn')],

        props: {
            facet: {
                type: String,
                default: 'primary',
            },

            disabled: {
                type: Boolean,
                default: false,
            },

            to: {
                type: Object,
                required: false,
                default: null,
            },
        },

        computed: {
            component() {
                return this.to ? 'router-link' : 'button';
            },

            classes() {
                return [
                    this.createFacet(this.facet),
                    this.createIfFacet(this.disabled, 'disabled'),
                ];
            },
        },
    };
</script>
