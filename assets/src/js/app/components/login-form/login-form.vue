<template>
    <form class="login-form"
            v-if="!isLoggedIn"
            @submit.prevent="onLogin">
        <h4>
            {{ title }}
        </h4>

        <div class="login-form--content">
            <div class="login-form--input-wrapper">
                <input-field
                        :disabled="isLoading"
                        placeholder="Password"
                        type="password"
                        :value="password"
                        :error="errorMessage"
                        @input='onChange'/>
            </div>
            <div>
                <btn :disabled="isLoading || !isSubmittable"
                        @click="onLogin">
                    {{ $t('login-form.submit-btn') }}
                </btn>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import Btn from '../base/btn/btn';
    import InputField from '../base/input-field/input-field';

    export default {
        components: { InputField, Btn },
        props: {
            title: {
                type: String,
                required: true,
            },
        },

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

            onChange(val) {
                this.password = val;
            },

            loginUser() {
                window.location.href = this.redirectUrl;
            },

            async onLogin() {
                this.isLoading = true;
                this.error = null;
                try {
                    await this.doLogin({ password: this.password });
                    this.loginUser();
                    this.isLoading = false;
                } catch (e) {
                    this.error = e;
                }
                this.isLoading = false;
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
        },
    };
</script>
