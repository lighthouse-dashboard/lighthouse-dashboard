<template>
    <component class='u-reset btn button'
            v-bind="$attrs"
            :class='classes'
            :href="to"
            :disabled='disabled'
            :is="component"
            v-on="$listeners">
        <span class='u-reset btn--content'>
            <slot/>
        </span>
    </component>
</template>

<script>
    import bemMixin from '../../../mixins/bem-mixin';

    export default {
        mixins: [bemMixin('btn')],

        props: {
            /** @type {string[]} */
            facets: {
                type: [Array, String],
                default: () => ['primary'],
            },

            disabled: {
                type: Boolean,
                default: false,
            },

            to: {
                type: String,
                required: false,
                default: null,
            },

            isActive: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            component() {
                switch (true) {
                    case !!this.$attrs.href :
                        return 'a';
                    case !!this.to:
                        return 'a';
                    default:
                        return 'button';
                }
            },

            classes() {
                return [
                    this.mapFacets(Array.isArray(this.facets) ? this.facets : [this.facets]),
                    this.createIfFacet(this.isActive, 'active'),
                    this.createIfFacet(this.disabled, 'disabled'),
                ];
            },
        },
    };
</script>
