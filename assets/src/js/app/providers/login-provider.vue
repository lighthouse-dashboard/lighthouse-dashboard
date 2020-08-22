<template>
    <div>
        <slot :is-logged-in="isLoggedIn"/>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: {
            ...mapState('login', ['isLoggedIn']),

        }
    }
</script>
