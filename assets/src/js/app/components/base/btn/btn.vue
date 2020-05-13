<template>
    <button class='btn button'
            :class='classes'
            :disabled='disabled'>
        <span class='btn--content'>
            <slot/>
        </span>
    </button>
</template>

<script>
    import bemMixin from '../../../mixins/bem-mixin';

    export default {
        props: {
            facet: {
                type: String,
                default: 'primary'
            },
            disabled: {
                type: Boolean,
                default: false,
            }
        },

        mixins: [bemMixin('btn')],
        computed: {
            classes() {
                return [
                    this.createFacet(this.facet),
                    this.createIfFacet(this.disabled, 'disabled')
                ];
            },
        },
    };
</script>
