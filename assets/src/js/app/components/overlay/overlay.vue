<template>
    <div class="overlay"
            v-if="active">
        <div class="overlay--backdrop"
                @click="onClose"/>

        <tile :title="title"
                v-bind="tileProps"
                class="overlay--content-wrapper">
            <slot/>
            <template slot="footer">
                <slot name="footer">
                    <slot name="additional"/>
                    <btn facets="flat"
                            class="overlay--action"
                            @click="onClose">
                        Close
                    </btn>
                </slot>
            </template>
        </tile>
    </div>
</template>

<script>
    import Btn from '../base/btn/btn';
    import Tile from '../tile/tile';

    export default {
        components: { Tile, Btn },
        props: {
            title: {
                type: String,
                default: null,
            },
            active: {
                type: Boolean,
                default: false,
            },
            tileProps: {
                type: Object,
                default: () => ({}),
            },
        },
        methods: {
            onClose() {
                this.$emit('close');
            },
        },
    };
</script>
