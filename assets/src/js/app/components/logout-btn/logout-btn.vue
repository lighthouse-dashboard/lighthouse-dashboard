<template>
    <btn
            to="/logout"
            :facets='["danger", "full-width"]'>
        {{ $t('logout.btn') }}
    </btn>
</template>

<script>
    import { mapActions } from 'vuex';
    import Btn from '../base/btn/btn';

    export default {
        components: { Btn },
        props: {},
        methods: {
            ...mapActions('login', ['logout']),

            onLogoutClicked() {
                this.logout();
                window.location.href = '/login';
            },
        },
    };
</script>
