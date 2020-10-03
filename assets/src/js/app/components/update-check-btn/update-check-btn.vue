<template>
    <btn :facets="['flat', 'full-width']" @click="checkForUpdate">Check for updates</btn>
</template>

<script>
    import Btn from '../base/btn/btn';

    export default {
        components: { Btn },
        props: {
            hasNewVersion: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            checkForUpdate() {
                this.$emit( 'checkforupdate' );
            },
        },
    };
</script>
