<template>
    <form @submit.prevent="onLogin">
        <slot v-bind="{password, errorMessage, isLoading, isSubmittable, isLoggedIn, onPasswordChange, onLogin}"/>
    </form>
</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        data() {
            return {
                password: '',
                redirectUrl: '/app/dashboard',

                /** @type {Error | null}*/
                error: null,

                isLoading: false,
            };
        },

        computed: {
            ...mapState('login', ['isLoggedIn']),

            errorMessage() {
                return this.error?.message;
            },

            isSubmittable() {
                return this.password.length > 0;
            },
        },

        methods: {
            ...mapActions('login', ['doLogin']),

            onPasswordChange(val) {
                console.log(val);
                this.password = val;
            },

            loginUser() {
                window.location.href = this.redirectUrl;
            },

            onLogin() {
                this.isLoading = true;
                this.error = null;
                this.doLogin({ password: this.password })
                    .then(() => {
                        this.loginUser();
                    })
                    .catch((e) => {
                        this.error = e;
                    })
                    .finally(() => {
                        this.isLoading = false;

                    });
            },
        },

        mounted() {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect');
            if (redirectUrl) {
                this.redirectUrl = redirectUrl;
            }

            if (this.isLoggedIn) {
                this.loginUser();
            }
        }
        ,
    }
    ;
</script>
