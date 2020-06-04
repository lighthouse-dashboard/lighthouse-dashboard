<template>
    <btn class="confirm-button"
            :class="rootClasses"
            v-bind="$attrs"
            v-on="{...$listeners, click: onClicked}">
        <span class="u-reset" v-if="isClicked">{{ confirm }}</span>
        <slot v-else/>
    </btn>
</template>

<script>
    import bemMixin from '../../../mixins/bem-mixin';
    import Btn from '../btn/btn';

    export default {
        components: { Btn },
        mixins: [bemMixin('confirm-button')],
        props: {
            confirm: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                isClicked: false,
                timeout: null,
            };
        },

        computed: {
            rootClasses() {
                return [
                    this.createIfFacet(this.isClicked, 'is-clicked'),
                ];
            },
        },

        methods: {
            onClicked() {
                if (this.isClicked) {
                    clearTimeout(this.timeout);
                    this.$emit('click');
                    this.isClicked = false;
                    return;
                }

                this.isClicked = true;
                this.timeout = setTimeout(() => {
                    this.isClicked = false;
                }, 2000);
            },
        },
    };
</script>
