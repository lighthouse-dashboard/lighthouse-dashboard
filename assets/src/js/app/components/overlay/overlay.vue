<template>
    <div class="overlay"
            v-if='active'>
        <div class='overlay--backdrop'
                @click='onClose'/>
        <div class='overlay--content-wrapper'>
            <p class='overlay--title'
                    v-if='title'>
                {{ title }}
            </p>

            <div class='overlay--content'>
                <slot/>
            </div>

            <div class='overlay--actions'>
                <slot name='actions'>
                    <slot name='additional'/>
                    <btn facets='flat'
                            class='overlay--action'
                            @click='onClose'>
                        Close
                    </btn>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Btn from '../base/btn/btn';

    export default {
        components: { Btn },
        props: {
            title: {
                type: String,
                default: null,
            },
            active: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            onClose() {
                this.$emit('close');
            },
        },
    };
</script>
