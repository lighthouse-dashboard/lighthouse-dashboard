<template>
    <button class='btn button'
            :class='classes'>
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
            }
        },

        mixins: [bemMixin('btn')],
        computed: {
            classes() {
                return [
                    this.createFacet(this.facet),
                ];
            },
        },
    };
</script>
